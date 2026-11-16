/**
 * Careers hiring configuration, separate from the CUSTOMER quote Tally form.
 *
 * Create a new Tally form using CAREERS_TALLY_SETUP.md and paste ONLY its
 * published form ID below (for example, from https://tally.so/r/<FORM_ID>).
 * NEVER reuse the customer's quote form ID from siteConfig.tally.
 */
const careersConfig = {
  tallyFormId: "PR91K0", // Published application: https://tally.so/r/PR91K0
  roles: [
    {
      title: "Moving Helper",
      shortTitle: "Helper",
      pay: "$25",
      description: "Be the hands-on support that keeps every move running smoothly.",
      expectations: [
        "Carefully load and unload furniture, boxes, and belongings",
        "Protect items and property with moving blankets and equipment",
        "Work safely, communicate clearly, and support the crew",
      ],
    },
    {
      title: "Moving Driver",
      shortTitle: "Driver",
      pay: "$28",
      description: "Drive our non-CDL box trucks and help deliver a smooth move.",
      expectations: [
        "Previous box-truck driving experience required",
        "Valid driver's license and clean driving record required",
        "Drive responsibly and assist with loading, unloading, and equipment",
      ],
    },
    {
      title: "Team Lead",
      shortTitle: "Lead",
      pay: "$28–$31",
      description: "Lead a crew on moving day and earn $3 more per hour than your qualified base role.",
      expectations: [
        "Experience moving, loading box trucks, and organizing storage units",
        "Experience coordinating crews and handling on-site challenges",
        "$28/hr when working as a helper lead; $31/hr when qualified as a driver lead",
      ],
    },
  ],
};

export default careersConfig;
