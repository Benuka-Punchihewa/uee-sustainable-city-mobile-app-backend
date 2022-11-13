const constants = {
  PORT: 5001,
  API: {
    PREFIX: "/api/v1",
  },
  USER: {
    ROLES: {
      ADMIN: "admin",
      GARBAGE_COLLECTOR: "garbageCollector",
      METER_READER: "meterReader",
      CITIZEN: "citizen",
    },
  },
  MODELS: {
    USER: "User",
    BUS: "Bus",
    TRANSIT_ROUTE: "TransitRoute",
  },
};

module.exports = constants;
