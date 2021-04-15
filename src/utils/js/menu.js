export default {
  menus: [
    {
      title: "User",
      to: "/user",
      icon: "mdi-account",
      roles: ["admin", "hr"],
    },
    {
      title: "Department",
      to: "/department",
      icon: "mdi-badge-account",
      roles: ["admin", "hr"],
    },
    {
      title: "Team",
      to: "/team",
      icon: "mdi-account-multiple",
      roles: ["admin", "sa"],
    },
    {
      title: "Company",
      to: "/company",
      icon: "mdi-home-city",
      roles: ["admin", "sa"],
    },
    {
      title: "Project",
      to: "/project",
      icon: "mdi-layers-triple",
      roles: ["admin", "sa"],
    },
    {
      title: "Development",
      to: "/development",
      icon: "mdi-briefcase-account",
      roles: ["admin", "dev"],
    },
    {
      title: "UAT Task",
      to: "/review",
      icon: "mdi-message-draw",
      roles: ["admin", "dev" , "sa"],
    },
    {
      title: "Report Time",
      to: "/report",
      icon: "mdi-chart-areaspline",
      roles: ["admin", "dev"],
    },
  ],
};
