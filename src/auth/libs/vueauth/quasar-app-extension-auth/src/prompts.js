module.exports = function () {
  return [
    {
      name: "authProvider",
      type: "list",
      message: "Select an auth provider",
      choices: [
        {
          name: "Supabase",
          value: {
            identifier: "supabase",
            packageName: "@vueauth/supabase",
          },
        },
      ],
    },
  ];
};
