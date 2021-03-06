export const validateUpdate =  {
  data() {
    return {
      valid: true,
      branchesName_rule: [
        () => !!this.branches_name || 'Branch Name is required'
      ],
      address_rule: [
        () => !!this.address || 'Address is required'
      ],
      rewardRate_rule: [
        () => !!this.reward_rates || 'Reward Rates is required'
      ],
      assetCode_rule: [
        () => !!this.asset_code || 'Asset Code is required'
      ],
      minimumSpend_rule: [
        () => !!this.minimum_spend || 'Minimum is required'
      ],
      approvalCode_rule: [
        () => !!this.approval_code || 'Approval Code is required'
      ],
      logoUri_rule: [
        () => !!this.logo_uri || 'Logo URI is required'
      ],
      isActive_rule: [
        () => !!this.is_active || 'Status is required'
      ],
    }
  }
}