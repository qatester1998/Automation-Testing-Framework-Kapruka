export const logger = {
  info: (message: string) => console.log(`[INFO]: ${message}`),
  error: (message: string) => console.error(`[ERROR]: ${message}`),
};

export function logStep(step: string) {
  console.log(`\n👉 STEP: ${step}`);
}