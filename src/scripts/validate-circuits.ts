import { DateTime } from "luxon";
import { circuits } from "../data/circuits";

const validateCircuits = () => {
  const results = circuits.map((circuit) => {
    // 1. Check if coordinates exist
    const hasCoords = !!(circuit.coords && circuit.coords.lat && circuit.coords.lon);

    // 2. Validate Time Zone using Luxon
    // setZone returns an invalid DateTime if the zone is unsupported
    const dt = DateTime.now().setZone(circuit.timeZone);
    const isZoneValid = dt.isValid;

    return {
      name: circuit.name,
      valid: hasCoords && isZoneValid,
      errors: [
        !hasCoords ? "Missing/Invalid Coords" : null,
        !isZoneValid ? `Invalid Zone: ${circuit.timeZone} (${dt.invalidReason})` : null,
      ].filter(Boolean),
    };
  });

  const invalid = results.filter((r) => !r.valid);

  if (invalid.length === 0) {
    console.log("✅ All circuits are valid.");
  } else {
    console.error("❌ Validation failed for the following circuits:", invalid);
  }
};

validateCircuits();
