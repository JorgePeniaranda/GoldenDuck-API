declare global {
  interface BigInt {
    toJSON: () => { $bigint: string }
  }
}
