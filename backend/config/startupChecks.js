import { config } from './env.js';

function isEmpty(value) {
    return value === undefined || value === null || String(value).trim().length === 0;
}

export function runStartupChecks() {
    const warnings = [];

    if (isEmpty(config.appApiKey)) {
        warnings.push('APP_API_KEY is missing. Protected endpoints will reject requests with 401.');
    }

    if (isEmpty(config.googleMapsApiKey)) {
        warnings.push('GOOGLE_MAPS_API_KEY is missing. Route and map features may fail.');
    }

    if (isEmpty(config.geminiApiKey)) {
        warnings.push('GEMINI_API_KEY is missing. AI safety analysis may fall back or fail.');
    }

    if (config.nodeEnv === 'production' && config.corsOrigin === '*') {
        warnings.push('CORS_ORIGIN is set to *. Set your Vercel domain in production for safer CORS.');
    }

    if (isEmpty(config.sorobanContractId)) {
        warnings.push('SOROBAN_CONTRACT_ID is not set. On-chain recording is disabled (mock mode).');
    }

    if (warnings.length > 0) {
        console.warn('\\n[Startup Checks] Deployment configuration warnings:');
        for (const warning of warnings) {
            console.warn(`- ${warning}`);
        }
        console.warn('');
    }
}
