export const validateAddBranch =  {
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
        () => !!this.asset_code || 'Reward Rates is required'
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
      merchant_rule: [
        () => !!this.merchant_id || 'Merchant is required'
      ],
    }
  }
}