#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, log, symbol_short, Address, BytesN, Env, Map, String, Vec, U256};

// Data structures
#[derive(Clone)]
#[contracttype]
pub struct UserProfile {
    pub wallet: Address,
    pub name: String,
    pub created_at: u64,
}

#[derive(Clone)]
#[contracttype]
pub struct TrustedContact {
    pub name: String,
    pub wallet: Address,
}

#[derive(Clone)]
#[contracttype]
pub struct SOSEvent {
    pub id: U256,
    pub user_wallet: Address,
    pub event_type: String,
    pub context_hash: String,
    pub timestamp: u64,
    pub acknowledged_by: Vec<Address>,
}

#[contracttype]
pub enum DataKey {
    NextEventId,
    User(Address),
    UserContacts(Address),
    Event(U256),
}

#[contract]
pub struct RakshaSafetyContract;

#[contractimpl]
impl RakshaSafetyContract {
    /// Register a new user on the Raksha safety network
    pub fn register_user(env: Env, wallet: Address, name: String) -> UserProfile {
        wallet.require_auth();
        
        let profile = UserProfile {
            wallet: wallet.clone(),
            name,
            created_at: env.block().timestamp(),
        };

        env.storage()
            .persistent()
            .set(&DataKey::User(wallet.clone()), &profile);

        log!(
            &env,
            "User registered: {}",
            wallet
        );

        profile
    }

    /// Get a user's profile
    pub fn get_user(env: Env, wallet: Address) -> Option<UserProfile> {
        env.storage()
            .persistent()
            .get(&DataKey::User(wallet))
    }

    /// Add trusted contacts
    pub fn add_trusted_contacts(
        env: Env,
        user: Address,
        contacts: Vec<TrustedContact>,
    ) {
        user.require_auth();

        env.storage()
            .persistent()
            .set(&DataKey::UserContacts(user.clone()), &contacts);

        log!(
            &env,
            "Added {} trusted contacts",
            contacts.len()
        );
    }

    /// Get trusted contacts
    pub fn get_trusted_contacts(env: Env, user: Address) -> Vec<TrustedContact> {
        env.storage()
            .persistent()
            .get(&DataKey::UserContacts(user))
            .unwrap_or_else(|| Vec::new(&env))
    }

    /// Trigger an SOS event
    pub fn trigger_sos(
        env: Env,
        user: Address,
        event_type: String,
        context_hash: String,
    ) -> SOSEvent {
        user.require_auth();

        let mut next_id: U256 = env
            .storage()
            .persistent()
            .get(&DataKey::NextEventId)
            .unwrap_or(U256::from_u32(&env, 1));

        let event = SOSEvent {
            id: next_id.clone(),
            user_wallet: user.clone(),
            event_type,
            context_hash,
            timestamp: env.block().timestamp(),
            acknowledged_by: Vec::new(&env),
        };

        env.storage()
            .persistent()
            .set(&DataKey::Event(next_id.clone()), &event);

        next_id = U256::from_u32(&env, next_id.u32() + 1);
        env.storage()
            .persistent()
            .set(&DataKey::NextEventId, &next_id);

        log!(
            &env,
            "SOS event triggered by user"
        );

        event
    }

    /// Acknowledge an SOS event
    pub fn acknowledge_sos(env: Env, event_id: U256, contact: Address) -> bool {
        contact.require_auth();

        if let Some(mut event) = env
            .storage()
            .persistent()
            .get::<_, SOSEvent>(&DataKey::Event(event_id.clone()))
        {
            event.acknowledged_by.push_back(contact.clone());

            env.storage()
                .persistent()
                .set(&DataKey::Event(event_id), &event);

            log!(
                &env,
                "SOS event acknowledged"
            );

            return true;
        }

        false
    }

    /// Get SOS event details
    pub fn get_sos_event(env: Env, event_id: U256) -> Option<SOSEvent> {
        env.storage()
            .persistent()
            .get(&DataKey::Event(event_id))
    }
}

#[cfg(all(test, not(target_family = "wasm")))]
mod tests {
    use super::*;
    use soroban_sdk::testutils::{Address as _, Ledger};
    use soroban_sdk::{symbol_short, Env};

    #[test]
    fn test_register_user() {
        let env = Env::default();
        let user = Address::random(&env);
        let name = String::from_slice(&env, "Test User");

        env.mock_all_auths();
        env.ledger().with_mut(|li| {
            li.timestamp = 0;
        });

        let profile = RakshaSafetyContract::register_user(env.clone(), user.clone(), name.clone());

        assert_eq!(profile.wallet, user);
        assert_eq!(profile.name, name);
    }

    #[test]
    fn test_trigger_sos() {
        let env = Env::default();
        let user = Address::random(&env);

        env.mock_all_auths();
        env.ledger().with_mut(|li| {
            li.timestamp = 100;
        });

        let name = String::from_slice(&env, "Test User");
        RakshaSafetyContract::register_user(env.clone(), user.clone(), name);

        let event_type = String::from_slice(&env, "SOS");
        let context_hash = String::from_slice(&env, "0xabcd1234");

        let event = RakshaSafetyContract::trigger_sos(
            env.clone(),
            user.clone(),
            event_type.clone(),
            context_hash.clone(),
        );

        assert_eq!(event.user_wallet, user);
        assert_eq!(event.event_type, event_type);
    }
}
