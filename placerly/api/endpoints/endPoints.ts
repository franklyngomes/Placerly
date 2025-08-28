export const endPoints = {
  signup:"/signup",
  signin:"/signin",
  profile:"/profile/",
  verify_email: "/verify-email",
  forgot_password: "/forgot-password",
  reset_password: "/reset-password",
  refresh_token: "/refresh-token",
  assets: {
    create: "/create-asset",
    get_asset: "/get-all-asset",
    details: "/asset-details/",
    update: "/asset-update/",
    delete: "/delete-asset/"
  },
  debts: {
    create: "/create-debt",
    get_debt: "/get-all-debt",
    details: "/debt-details/",
    update: "/debt-update/",
    delete: "/delete-debt/"
  },
  insurance: {
    create: "/create-insurance",
    get_insurance: "/get-all-insurance",
    details: "/insurance-details/",
    update: "/insurance-update/",
    delete: "/delete-insurance/"
  },
  utility: {
    create: "/create-utility",
    get_utility: "/get-all-utility",
    details: "/utility-details/",
    update: "/utility-update/",
    delete: "/delete-utility/"
  },
  transition: {
    create: "/create-transition",
    get_transition: "/get-all-transition",
    details: "/transition-details/",
    update: "/transition-update/",
    delete: "/delete-transition/"
  }
};
