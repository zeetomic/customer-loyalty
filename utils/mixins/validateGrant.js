export const validateGrant = {
  data() {
    return {
      valid: true,
      emailRule: [
        () => !!this.email || 'Email is required'
      ],
    }
  }
}