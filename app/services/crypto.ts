import * as Crypto from 'expo-crypto';

export async function generateDigest(inputString:string) {
  try {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      inputString
    );
    return digest;
  } catch (error) {
    console.error("Error al generar el digest:", error);
    throw error;
  }
}
export default generateDigest