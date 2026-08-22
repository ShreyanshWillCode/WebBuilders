import "./Clients.css";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

const clients = [
  { abbr: "OR", name: "OrderHive", cls: "logos__card--orange" },
  { abbr: "FP", name: "FleetPulse", cls: "logos__card--teal" },
  { abbr: "SV", name: "ScanVault", cls: "logos__card--yellow" },
  { abbr: "CT", name: "ClariTask", cls: "logos__card--purple" },
  { abbr: "NB", name: "NimbleBill", cls: "logos__card--orange" },
  { abbr: "FC", name: "FieldCheck", cls: "logos__card--teal" },
];

export default function Clients() {
  return (
    <section className="section logos" aria-label="Clients">
      <div className="section__inner">
        <AnimatedSectionHeading direction="right">06 / CLIENTS &amp; PARTNERS</AnimatedSectionHeading>
        <div className="logos__grid">
          {clients.map((c) => (
            <div key={c.name} className={`logos__card ${c.cls}`}>
              <span className="logos__abbr">{c.abbr}</span>
              <span className="logos__name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
