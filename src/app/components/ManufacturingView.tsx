import { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, Clock, ChevronRight, ArrowLeft, Factory, Zap, Wind, Droplets, Box, Eye } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  status: "complete" | "in-progress" | "issue" | "pending" | "testing" | "commissioned";
  type: string;
  location: string;
  contractor?: string;
  powerRating?: string;
  testResult?: string;
}

interface ProductionLine {
  id: string;
  name: string;
  lineNumber: string;
  capacity: string;
  equipment: Equipment[];
}

interface Zone {
  id: string;
  name: string;
  description: string;
  area: number; // in sqm
  type: "production" | "assembly" | "warehouse" | "utilities" | "quality" | "office";
  productionLines: ProductionLine[];
}

interface FactoryProject {
  id: string;
  name: string;
  type: "automotive" | "electronics" | "pharmaceutical" | "food-beverage" | "textile";
  totalArea: number; // in sqm
  zones: Zone[];
}

const mockManufacturingData: FactoryProject[] = [
  {
    id: "factory-auto-1",
    name: "Dubai Automotive Assembly Plant",
    type: "automotive",
    totalArea: 50000,
    zones: [
      {
        id: "zone-bodyshop",
        name: "Body Shop",
        description: "Vehicle body welding and assembly",
        area: 12000,
        type: "production",
        productionLines: [
          {
            id: "line-bodyshop-1",
            name: "Main Body Line",
            lineNumber: "BL-01",
            capacity: "60 units/day",
            equipment: [
              { id: "eq-1", status: "complete", name: "Robot Welding Cell 1", type: "Robotic Welder", location: "Station 1", contractor: "ABB Robotics", powerRating: "380V, 50kW", testResult: "Commissioned" },
              { id: "eq-2", status: "complete", name: "Robot Welding Cell 2", type: "Robotic Welder", location: "Station 2", contractor: "ABB Robotics", powerRating: "380V, 50kW", testResult: "Commissioned" },
              { id: "eq-3", status: "complete", name: "Hemming Station", type: "Hydraulic Press", location: "Station 3", contractor: "Schuler Press", powerRating: "380V, 75kW", testResult: "Passed" },
              { id: "eq-4", status: "in-progress", name: "Robot Welding Cell 3", type: "Robotic Welder", location: "Station 4", contractor: "ABB Robotics", powerRating: "380V, 50kW", testResult: "Installation 80%" },
              { id: "eq-5", status: "testing", name: "Spot Welding Machine", type: "Spot Welder", location: "Station 5", contractor: "KUKA", powerRating: "380V, 40kW", testResult: "Testing in progress" },
            ],
          },
          {
            id: "line-bodyshop-2",
            name: "Underbody Line",
            lineNumber: "BL-02",
            capacity: "60 units/day",
            equipment: [
              { id: "eq-6", status: "complete", name: "Framing Station 1", type: "Robotic Welder", location: "Station 1", contractor: "Fanuc", powerRating: "380V, 45kW", testResult: "Commissioned" },
              { id: "eq-7", status: "complete", name: "Framing Station 2", type: "Robotic Welder", location: "Station 2", contractor: "Fanuc", powerRating: "380V, 45kW", testResult: "Commissioned" },
              { id: "eq-8", status: "in-progress", name: "Assembly Fixture", type: "Hydraulic Fixture", location: "Station 3", contractor: "ABB Robotics", powerRating: "380V, 30kW" },
              { id: "eq-9", status: "issue", name: "Conveyor System", type: "Overhead Conveyor", location: "Full Line", contractor: "Durr Systems", powerRating: "380V, 25kW", testResult: "Motor failure detected" },
            ],
          },
        ],
      },
      {
        id: "zone-paintshop",
        name: "Paint Shop",
        description: "Cleaning, coating, and painting operations",
        area: 8000,
        type: "production",
        productionLines: [
          {
            id: "line-paint-1",
            name: "Pre-Treatment Line",
            lineNumber: "PT-01",
            capacity: "60 units/day",
            equipment: [
              { id: "eq-10", status: "complete", name: "Degreasing Tank", type: "Chemical Tank", location: "Station 1", contractor: "Eisenmann", powerRating: "380V, 20kW", testResult: "Passed" },
              { id: "eq-11", status: "complete", name: "Phosphating Tank", type: "Chemical Tank", location: "Station 2", contractor: "Eisenmann", powerRating: "380V, 20kW", testResult: "Passed" },
              { id: "eq-12", status: "complete", name: "E-Coat Tank", type: "Electrophoretic Tank", location: "Station 3", contractor: "Eisenmann", powerRating: "380V, 100kW", testResult: "Commissioned" },
              { id: "eq-13", status: "complete", name: "Drying Oven 1", type: "Curing Oven", location: "Station 4", contractor: "Eisenmann", powerRating: "380V, 150kW", testResult: "Temperature calibrated" },
            ],
          },
          {
            id: "line-paint-2",
            name: "Top Coat Line",
            lineNumber: "TC-01",
            capacity: "60 units/day",
            equipment: [
              { id: "eq-14", status: "complete", name: "Sealing Robot 1", type: "Sealing Robot", location: "Station 1", contractor: "ABB Robotics", powerRating: "380V, 35kW", testResult: "Commissioned" },
              { id: "eq-15", status: "complete", name: "Sealing Robot 2", type: "Sealing Robot", location: "Station 2", contractor: "ABB Robotics", powerRating: "380V, 35kW", testResult: "Commissioned" },
              { id: "eq-16", status: "testing", name: "Base Coat Booth", type: "Paint Booth", location: "Station 3", contractor: "Durr Systems", powerRating: "380V, 200kW", testResult: "Air flow testing" },
              { id: "eq-17", status: "in-progress", name: "Clear Coat Booth", type: "Paint Booth", location: "Station 4", contractor: "Durr Systems", powerRating: "380V, 200kW" },
              { id: "eq-18", status: "pending", name: "Flash-Off Zone", type: "Ventilation System", location: "Station 5", contractor: "Durr Systems", powerRating: "380V, 80kW" },
              { id: "eq-19", status: "pending", name: "Final Oven", type: "Curing Oven", location: "Station 6", contractor: "Eisenmann", powerRating: "380V, 180kW" },
            ],
          },
        ],
      },
      {
        id: "zone-assembly",
        name: "Final Assembly",
        description: "Vehicle final assembly and trim",
        area: 15000,
        type: "assembly",
        productionLines: [
          {
            id: "line-trim-1",
            name: "Trim Line 1",
            lineNumber: "TL-01",
            capacity: "60 units/day",
            equipment: [
              { id: "eq-20", status: "complete", name: "Cockpit Installation", type: "Assembly Station", location: "Station 1", contractor: "Bosch", powerRating: "220V, 10kW", testResult: "Operational" },
              { id: "eq-21", status: "complete", name: "Dashboard Assembly", type: "Assembly Station", location: "Station 2", contractor: "Bosch", powerRating: "220V, 10kW", testResult: "Operational" },
              { id: "eq-22", status: "in-progress", name: "Door Trim Station", type: "Assembly Station", location: "Station 3", contractor: "Bosch", powerRating: "220V, 8kW" },
              { id: "eq-23", status: "in-progress", name: "Seat Installation Robot", type: "Collaborative Robot", location: "Station 4", contractor: "Universal Robots", powerRating: "220V, 5kW" },
            ],
          },
          {
            id: "line-chassis-1",
            name: "Chassis Line",
            lineNumber: "CL-01",
            capacity: "60 units/day",
            equipment: [
              { id: "eq-24", status: "complete", name: "Engine Marriage Station", type: "Lifting System", location: "Station 1", contractor: "Comau", powerRating: "380V, 40kW", testResult: "Load tested" },
              { id: "eq-25", status: "complete", name: "Transmission Installation", type: "Assembly Station", location: "Station 2", contractor: "Comau", powerRating: "380V, 30kW", testResult: "Commissioned" },
              { id: "eq-26", status: "complete", name: "Wheel Assembly AGV", type: "Automated Vehicle", location: "Station 3", contractor: "KUKA", powerRating: "48V DC", testResult: "Navigation tested" },
              { id: "eq-27", status: "testing", name: "Fluid Filling Station", type: "Filling System", location: "Station 4", contractor: "Graco", powerRating: "380V, 15kW", testResult: "Calibration in progress" },
            ],
          },
        ],
      },
      {
        id: "zone-quality",
        name: "Quality Control",
        description: "Inspection and testing area",
        area: 5000,
        type: "quality",
        productionLines: [
          {
            id: "line-qc-1",
            name: "Inspection Line",
            lineNumber: "QC-01",
            capacity: "60 units/day",
            equipment: [
              { id: "eq-28", status: "complete", name: "3D Scanning Station", type: "Laser Scanner", location: "Bay 1", contractor: "Zeiss", powerRating: "220V, 5kW", testResult: "Calibrated" },
              { id: "eq-29", status: "complete", name: "Water Test Chamber", type: "Water Leak Test", location: "Bay 2", contractor: "ATT", powerRating: "380V, 30kW", testResult: "Operational" },
              { id: "eq-30", status: "in-progress", name: "Dynamometer", type: "Performance Test", location: "Bay 3", contractor: "AVL", powerRating: "380V, 250kW" },
              { id: "eq-31", status: "issue", name: "Emission Testing System", type: "Gas Analyzer", location: "Bay 4", contractor: "Horiba", powerRating: "220V, 10kW", testResult: "Sensor calibration failed" },
            ],
          },
        ],
      },
      {
        id: "zone-utilities",
        name: "Central Utilities",
        description: "Power, HVAC, compressed air, and water systems",
        area: 3000,
        type: "utilities",
        productionLines: [
          {
            id: "line-util-1",
            name: "Utility Systems",
            lineNumber: "UT-01",
            capacity: "Full plant support",
            equipment: [
              { id: "eq-32", status: "complete", name: "Main Transformer 1", type: "Power Transformer", location: "Electrical Room 1", contractor: "Siemens", powerRating: "11kV/380V, 2500kVA", testResult: "Load tested" },
              { id: "eq-33", status: "complete", name: "Main Transformer 2", type: "Power Transformer", location: "Electrical Room 2", contractor: "Siemens", powerRating: "11kV/380V, 2500kVA", testResult: "Load tested" },
              { id: "eq-34", status: "complete", name: "Diesel Generator", type: "Emergency Generator", location: "Generator Room", contractor: "Caterpillar", powerRating: "1500kVA", testResult: "Commissioned" },
              { id: "eq-35", status: "complete", name: "Chiller Unit 1", type: "Water Chiller", location: "HVAC Plant", contractor: "Carrier", powerRating: "380V, 300kW", testResult: "Performance verified" },
              { id: "eq-36", status: "complete", name: "Chiller Unit 2", type: "Water Chiller", location: "HVAC Plant", contractor: "Carrier", powerRating: "380V, 300kW", testResult: "Performance verified" },
              { id: "eq-37", status: "complete", name: "Compressed Air System", type: "Air Compressor", location: "Compressor Room", contractor: "Atlas Copco", powerRating: "380V, 250kW", testResult: "Pressure tested" },
              { id: "eq-38", status: "in-progress", name: "Water Treatment Plant", type: "RO System", location: "Water Plant", contractor: "Veolia", powerRating: "380V, 50kW" },
              { id: "eq-39", status: "testing", name: "Fire Suppression System", type: "Sprinkler System", location: "Entire Plant", contractor: "Tyco", powerRating: "220V, 20kW", testResult: "Pressure testing" },
            ],
          },
        ],
      },
      {
        id: "zone-warehouse",
        name: "Parts Warehouse",
        description: "Component storage and logistics",
        area: 7000,
        type: "warehouse",
        productionLines: [
          {
            id: "line-wh-1",
            name: "Automated Storage",
            lineNumber: "WH-01",
            capacity: "10,000 pallets",
            equipment: [
              { id: "eq-40", status: "complete", name: "AS/RS Crane 1", type: "Automated Crane", location: "Aisle 1-5", contractor: "Dematic", powerRating: "380V, 35kW", testResult: "Positioning tested" },
              { id: "eq-41", status: "complete", name: "AS/RS Crane 2", type: "Automated Crane", location: "Aisle 6-10", contractor: "Dematic", powerRating: "380V, 35kW", testResult: "Positioning tested" },
              { id: "eq-42", status: "complete", name: "Conveyor System", type: "Belt Conveyor", location: "Main Aisle", contractor: "Dematic", powerRating: "380V, 40kW", testResult: "Operational" },
              { id: "eq-43", status: "in-progress", name: "AGV Fleet (10 units)", type: "Autonomous Vehicle", location: "Warehouse Floor", contractor: "KUKA", powerRating: "48V DC" },
              { id: "eq-44", status: "pending", name: "Picking Robots", type: "Collaborative Robot", location: "Picking Area", contractor: "Universal Robots", powerRating: "220V, 5kW" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "factory-pharma-1",
    name: "Abu Dhabi Pharmaceutical Plant",
    type: "pharmaceutical",
    totalArea: 30000,
    zones: [
      {
        id: "zone-cleanroom",
        name: "Clean Room Production",
        description: "ISO Class 7 sterile manufacturing",
        area: 8000,
        type: "production",
        productionLines: [
          {
            id: "line-sterile-1",
            name: "Sterile Fill Line",
            lineNumber: "SF-01",
            capacity: "300 vials/min",
            equipment: [
              { id: "eq-50", status: "complete", name: "Vial Washing Machine", type: "Washer", location: "Station 1", contractor: "Bausch+Ströbel", powerRating: "380V, 25kW", testResult: "Validated" },
              { id: "eq-51", status: "complete", name: "Sterilization Tunnel", type: "Depyrogenation", location: "Station 2", contractor: "Bausch+Ströbel", powerRating: "380V, 80kW", testResult: "Temperature validated" },
              { id: "eq-52", status: "testing", name: "Filling Machine", type: "Aseptic Filler", location: "Station 3", contractor: "Bausch+Ströbel", powerRating: "380V, 30kW", testResult: "IQ/OQ in progress" },
              { id: "eq-53", status: "in-progress", name: "Lyophilizer", type: "Freeze Dryer", location: "Station 4", contractor: "IMA", powerRating: "380V, 150kW" },
              { id: "eq-54", status: "pending", name: "Capping Machine", type: "Crimper", location: "Station 5", contractor: "Bausch+Ströbel", powerRating: "380V, 15kW" },
            ],
          },
        ],
      },
      {
        id: "zone-solid-dose",
        name: "Solid Dosage",
        description: "Tablet and capsule production",
        area: 6000,
        type: "production",
        productionLines: [
          {
            id: "line-tablet-1",
            name: "Tablet Compression",
            lineNumber: "TB-01",
            capacity: "500,000 tablets/hour",
            equipment: [
              { id: "eq-55", status: "complete", name: "High Speed Mixer", type: "Granulator", location: "Station 1", contractor: "GEA", powerRating: "380V, 75kW", testResult: "Qualified" },
              { id: "eq-56", status: "complete", name: "Fluid Bed Dryer", type: "Dryer", location: "Station 2", contractor: "GEA", powerRating: "380V, 100kW", testResult: "Qualified" },
              { id: "eq-57", status: "complete", name: "Tablet Press", type: "Rotary Press", location: "Station 3", contractor: "Fette", powerRating: "380V, 50kW", testResult: "Commissioned" },
              { id: "eq-58", status: "testing", name: "Coating Machine", type: "Film Coater", location: "Station 4", contractor: "GEA", powerRating: "380V, 60kW", testResult: "Process validation" },
              { id: "eq-59", status: "issue", name: "Vision Inspection", type: "Camera System", location: "Station 5", contractor: "Antares Vision", powerRating: "220V, 5kW", testResult: "Software calibration error" },
            ],
          },
        ],
      },
      {
        id: "zone-packaging",
        name: "Packaging Hall",
        description: "Primary and secondary packaging",
        area: 5000,
        type: "assembly",
        productionLines: [
          {
            id: "line-pack-1",
            name: "Blister Packaging",
            lineNumber: "PK-01",
            capacity: "200 blisters/min",
            equipment: [
              { id: "eq-60", status: "complete", name: "Blister Machine", type: "Thermoformer", location: "Station 1", contractor: "Uhlmann", powerRating: "380V, 40kW", testResult: "Validated" },
              { id: "eq-61", status: "complete", name: "Cartoning Machine", type: "Cartoner", location: "Station 2", contractor: "Uhlmann", powerRating: "380V, 25kW", testResult: "Operational" },
              { id: "eq-62", status: "in-progress", name: "Serialization System", type: "Track & Trace", location: "Station 3", contractor: "Antares Vision", powerRating: "220V, 10kW" },
            ],
          },
        ],
      },
      {
        id: "zone-hvac",
        name: "HVAC & Clean Utilities",
        description: "Air handling and clean utilities",
        area: 4000,
        type: "utilities",
        productionLines: [
          {
            id: "line-hvac-1",
            name: "Clean Room HVAC",
            lineNumber: "HV-01",
            capacity: "150,000 CFM",
            equipment: [
              { id: "eq-70", status: "complete", name: "AHU-1 (Clean Room)", type: "Air Handler", location: "AHU Room 1", contractor: "Trox", powerRating: "380V, 200kW", testResult: "Air flow validated" },
              { id: "eq-71", status: "complete", name: "AHU-2 (Clean Room)", type: "Air Handler", location: "AHU Room 2", contractor: "Trox", powerRating: "380V, 200kW", testResult: "Air flow validated" },
              { id: "eq-72", status: "complete", name: "Pure Steam Generator", type: "Steam System", location: "Utilities", contractor: "Spirax Sarco", powerRating: "380V, 150kW", testResult: "Endotoxin tested" },
              { id: "eq-73", status: "testing", name: "WFI System", type: "Water Purification", location: "Water Room", contractor: "Veolia", powerRating: "380V, 60kW", testResult: "Conductivity testing" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "factory-electronics-1",
    name: "Sharjah Electronics Assembly",
    type: "electronics",
    totalArea: 20000,
    zones: [
      {
        id: "zone-smt",
        name: "SMT Production",
        description: "Surface mount technology assembly",
        area: 6000,
        type: "production",
        productionLines: [
          {
            id: "line-smt-1",
            name: "SMT Line 1",
            lineNumber: "SMT-01",
            capacity: "25,000 components/hour",
            equipment: [
              { id: "eq-80", status: "complete", name: "Solder Paste Printer", type: "Screen Printer", location: "Station 1", contractor: "Juki", powerRating: "220V, 3kW", testResult: "Vision aligned" },
              { id: "eq-81", status: "complete", name: "SPI Machine", type: "Inspection", location: "Station 2", contractor: "Koh Young", powerRating: "220V, 2kW", testResult: "Calibrated" },
              { id: "eq-82", status: "complete", name: "Pick & Place Machine 1", type: "Chip Mounter", location: "Station 3", contractor: "Fuji", powerRating: "220V, 5kW", testResult: "Commissioned" },
              { id: "eq-83", status: "complete", name: "Pick & Place Machine 2", type: "Chip Mounter", location: "Station 4", contractor: "Fuji", powerRating: "220V, 5kW", testResult: "Commissioned" },
              { id: "eq-84", status: "testing", name: "Reflow Oven", type: "Soldering Oven", location: "Station 5", contractor: "Heller", powerRating: "380V, 40kW", testResult: "Temperature profiling" },
              { id: "eq-85", status: "in-progress", name: "AOI Machine", type: "Optical Inspection", location: "Station 6", contractor: "Koh Young", powerRating: "220V, 3kW" },
            ],
          },
        ],
      },
      {
        id: "zone-testing",
        name: "Functional Test",
        description: "Product testing and burn-in",
        area: 4000,
        type: "quality",
        productionLines: [
          {
            id: "line-test-1",
            name: "Test Line 1",
            lineNumber: "TST-01",
            capacity: "1,000 units/day",
            equipment: [
              { id: "eq-90", status: "complete", name: "ICT Machine", type: "In-Circuit Test", location: "Station 1", contractor: "Agilent", powerRating: "220V, 8kW", testResult: "Probe calibrated" },
              { id: "eq-91", status: "complete", name: "Functional Test", type: "Test Station", location: "Station 2", contractor: "National Instruments", powerRating: "220V, 5kW", testResult: "Software validated" },
              { id: "eq-92", status: "in-progress", name: "Burn-in Oven", type: "Environmental Chamber", location: "Station 3", contractor: "Espec", powerRating: "380V, 80kW" },
            ],
          },
        ],
      },
    ],
  },
];

const StatusBadge = ({ status }: { status: "complete" | "in-progress" | "issue" | "pending" | "testing" | "commissioned" }) => {
  const config = {
    complete: { bg: "#34d399", icon: CheckCircle, label: "Complete" },
    commissioned: { bg: "#10b981", icon: CheckCircle, label: "Commissioned" },
    "in-progress": { bg: "#60a5fa", icon: Clock, label: "In Progress" },
    issue: { bg: "#f87171", icon: AlertCircle, label: "Issue" },
    pending: { bg: "#94a3b8", icon: Clock, label: "Pending" },
    testing: { bg: "#fbbf24", icon: AlertCircle, label: "Testing" },
  };

  const { bg, icon: Icon } = config[status];

  return (
    <div
      className="w-[32px] h-[32px] rounded flex items-center justify-center text-white relative group cursor-pointer flex-shrink-0"
      style={{ backgroundColor: bg }}
    >
      <Icon className="w-4 h-4" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {config[status].label}
      </div>
    </div>
  );
};

type ViewLevel = "factories" | "zones" | "lines" | "equipment";

export function ManufacturingView() {
  const [viewLevel, setViewLevel] = useState<ViewLevel>("factories");
  const [selectedFactory, setSelectedFactory] = useState<FactoryProject | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedLine, setSelectedLine] = useState<ProductionLine | null>(null);
  const [expandedEquipment, setExpandedEquipment] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "open" | "resolved">("all");
  const [showVisualView, setShowVisualView] = useState(false);

  const getStatusCounts = (equipment: Equipment[]) => {
    return {
      complete: equipment.filter((e) => e.status === "complete").length,
      commissioned: equipment.filter((e) => e.status === "commissioned").length,
      inProgress: equipment.filter((e) => e.status === "in-progress").length,
      issue: equipment.filter((e) => e.status === "issue").length,
      pending: equipment.filter((e) => e.status === "pending").length,
      testing: equipment.filter((e) => e.status === "testing").length,
      total: equipment.length,
    };
  };

  const getLineCounts = (line: ProductionLine) => {
    return getStatusCounts(line.equipment);
  };

  const getZoneCounts = (zone: Zone) => {
    const allEquipment = zone.productionLines.flatMap((l) => l.equipment);
    return getStatusCounts(allEquipment);
  };

  const getFactoryCounts = (factory: FactoryProject) => {
    const allEquipment = factory.zones.flatMap((z) => z.productionLines.flatMap((l) => l.equipment));
    return getStatusCounts(allEquipment);
  };

  const getOpenCount = () => {
    return mockManufacturingData.reduce((acc, factory) => {
      return acc + factory.zones.reduce((zAcc, zone) => {
        return zAcc + zone.productionLines.reduce((lAcc, line) => {
          return lAcc + line.equipment.filter((e) => e.status === "issue").length;
        }, 0);
      }, 0);
    }, 0);
  };

  const getResolvedCount = () => {
    return mockManufacturingData.reduce((acc, factory) => {
      return acc + factory.zones.reduce((zAcc, zone) => {
        return zAcc + zone.productionLines.reduce((lAcc, line) => {
          return lAcc + line.equipment.filter((e) => e.status === "complete" || e.status === "commissioned").length;
        }, 0);
      }, 0);
    }, 0);
  };

  const handleFactoryClick = (factory: FactoryProject) => {
    setSelectedFactory(factory);
    setViewLevel("zones");
  };

  const handleZoneClick = (zone: Zone) => {
    setSelectedZone(zone);
    setViewLevel("lines");
  };

  const handleLineClick = (line: ProductionLine) => {
    setSelectedLine(line);
    setViewLevel("equipment");
  };

  const handleBackToFactories = () => {
    setSelectedFactory(null);
    setSelectedZone(null);
    setSelectedLine(null);
    setViewLevel("factories");
  };

  const handleBackToZones = () => {
    setSelectedZone(null);
    setSelectedLine(null);
    setViewLevel("zones");
  };

  const handleBackToLines = () => {
    setSelectedLine(null);
    setViewLevel("lines");
  };

  const getZoneIcon = (type: string) => {
    switch (type) {
      case "production": return "🏭";
      case "assembly": return "🔧";
      case "warehouse": return "📦";
      case "utilities": return "⚡";
      case "quality": return "✓";
      case "office": return "🏢";
      default: return "🏗️";
    }
  };

  const getFactoryTypeIcon = (type: string) => {
    switch (type) {
      case "automotive": return "🚗";
      case "electronics": return "📱";
      case "pharmaceutical": return "💊";
      case "food-beverage": return "🍔";
      case "textile": return "👕";
      default: return "🏭";
    }
  };

  const renderBreadcrumb = () => {
    return (
      <div className="bg-white border-b border-[#e2e8f0] px-4 py-2 flex items-center gap-2 text-[12px] text-[#64748b] flex-shrink-0 overflow-x-auto">
        <span>Manufacturing Projects</span>
        {viewLevel === "factories" && (
          <>
            <span>/</span>
            <span className="text-[#0f172a] font-medium">All Factories</span>
          </>
        )}
        {viewLevel === "zones" && selectedFactory && (
          <>
            <span>/</span>
            <button onClick={handleBackToFactories} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedFactory.name}
            </button>
            <span>/</span>
            <span className="text-[#0f172a] font-medium">All Zones</span>
          </>
        )}
        {viewLevel === "lines" && selectedFactory && selectedZone && (
          <>
            <span>/</span>
            <button onClick={handleBackToFactories} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedFactory.name}
            </button>
            <span>/</span>
            <button onClick={handleBackToZones} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedZone.name}
            </button>
            <span>/</span>
            <span className="text-[#0f172a] font-medium">Production Lines</span>
          </>
        )}
        {viewLevel === "equipment" && selectedFactory && selectedZone && selectedLine && (
          <>
            <span>/</span>
            <button onClick={handleBackToFactories} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedFactory.name}
            </button>
            <span>/</span>
            <button onClick={handleBackToZones} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedZone.name}
            </button>
            <span>/</span>
            <button onClick={handleBackToLines} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedLine.name}
            </button>
            <span>/</span>
            <span className="text-[#0f172a] font-medium">Equipment</span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex bg-[#e8ebef] relative">
      {/* Floating Visual View Button */}
      {selectedFactory && (
        <button
          onClick={() => setShowVisualView(!showVisualView)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#10b981] to-[#34d399] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-semibold text-[13px]"
        >
          <Eye className="w-5 h-5" />
          {showVisualView ? "Hide" : "Show"} Floor Plan
        </button>
      )}

      {/* Visual View Modal - Will be populated later */}
      {showVisualView && selectedFactory && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowVisualView(false)}>
          <div className="bg-white rounded-lg w-full max-w-[1400px] max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
              <h2 className="text-[18px] font-bold text-[#0f172a]">Factory Floor Plan - {selectedFactory.name}</h2>
              <button
                onClick={() => setShowVisualView(false)}
                className="p-2 hover:bg-[#f8fafc] rounded transition-colors"
              >
                <svg className="w-5 h-5 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="text-center text-[14px] text-[#64748b] py-12">
                Floor plan visualization coming soon...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar - Filters */}
      <div className="w-[240px] bg-white border-r border-[#e2e8f0] flex-shrink-0 overflow-y-auto hidden md:block">
        <div className="p-4">
          {/* Filter Contractor */}
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Filter Contractor</h3>
            <select className="w-full h-[36px] border border-[#e2e8f0] rounded px-3 text-[12px] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#10b981]">
              <option>All contractors</option>
              <option>ABB Robotics</option>
              <option>Siemens</option>
              <option>KUKA</option>
              <option>Durr Systems</option>
              <option>Dematic</option>
            </select>
          </div>

          {/* Zone Type Filter */}
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Zone Type</h3>
            <div className="space-y-2">
              {["production", "assembly", "warehouse", "utilities", "quality"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-[12px] text-[#475569] capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Current View Info */}
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Current View</h3>
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded px-3 py-2">
              <div className="flex items-center gap-2">
                {viewLevel === "factories" && (
                  <>
                    <Factory className="w-4 h-4 text-[#10b981]" />
                    <span className="text-[12px] text-[#334155] font-medium">All Factories</span>
                  </>
                )}
                {viewLevel === "zones" && (
                  <>
                    <Box className="w-4 h-4 text-[#10b981]" />
                    <span className="text-[12px] text-[#334155] font-medium">Viewing Zones</span>
                  </>
                )}
                {viewLevel === "lines" && (
                  <>
                    <Factory className="w-4 h-4 text-[#10b981]" />
                    <span className="text-[12px] text-[#334155] font-medium">Production Lines</span>
                  </>
                )}
                {viewLevel === "equipment" && (
                  <>
                    <Zap className="w-4 h-4 text-[#10b981]" />
                    <span className="text-[12px] text-[#334155] font-medium">Equipment</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Status Legend</h3>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#10b981]"></span>
                <span className="text-[#64748b]">Commissioned</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#34d399]"></span>
                <span className="text-[#64748b]">Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#60a5fa]"></span>
                <span className="text-[#64748b]">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#fbbf24]"></span>
                <span className="text-[#64748b]">Testing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#f87171]"></span>
                <span className="text-[#64748b]">Issue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#94a3b8]"></span>
                <span className="text-[#64748b]">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Breadcrumb */}
        {renderBreadcrumb()}

        {/* Content with smooth transitions */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="transition-all duration-300 ease-in-out">
            {/* Back Button */}
            {viewLevel !== "factories" && (
              <button
                onClick={
                  viewLevel === "zones" ? handleBackToFactories :
                  viewLevel === "lines" ? handleBackToZones :
                  handleBackToLines
                }
                className="flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] transition-colors text-[13px] font-medium text-[#334155]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {viewLevel === "zones" ? "Factories" : viewLevel === "lines" ? "Zones" : "Production Lines"}
              </button>
            )}

            {/* FACTORIES VIEW */}
            {viewLevel === "factories" && (
              <div className="space-y-4">
                <h2 className="text-[20px] font-bold text-[#0f172a] mb-4">Select a Manufacturing Facility</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockManufacturingData.map((factory) => {
                    const counts = getFactoryCounts(factory);
                    return (
                      <div
                        key={factory.id}
                        onClick={() => handleFactoryClick(factory)}
                        className="bg-white rounded-lg border-2 border-[#e2e8f0] hover:border-[#10b981] hover:shadow-lg transition-all cursor-pointer p-6 group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="text-4xl">{getFactoryTypeIcon(factory.type)}</div>
                            <div>
                              <h3 className="text-[15px] font-bold text-[#0f172a] group-hover:text-[#10b981] transition-colors">
                                {factory.name}
                              </h3>
                              <p className="text-[11px] text-[#64748b] mt-1 capitalize">{factory.type} Industry</p>
                              <p className="text-[10px] text-[#94a3b8] mt-1">Area: {factory.totalArea.toLocaleString()} m²</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#10b981] transition-colors flex-shrink-0" />
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
                          <div className="flex items-center justify-between text-[11px] mb-2">
                            <span className="text-[#64748b]">Zones:</span>
                            <span className="font-semibold text-[#0f172a]">{factory.zones.length}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                              <span className="text-[#64748b]">Ready: {counts.commissioned}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#60a5fa]"></span>
                              <span className="text-[#64748b]">Active: {counts.inProgress}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#f87171]"></span>
                              <span className="text-[#64748b]">Issues: {counts.issue}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span>
                              <span className="text-[#64748b]">Testing: {counts.testing}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ZONES VIEW */}
            {viewLevel === "zones" && selectedFactory && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-[20px] font-bold text-[#0f172a]">{selectedFactory.name}</h2>
                  <p className="text-[13px] text-[#64748b] mt-1 capitalize">
                    {selectedFactory.type} | {selectedFactory.totalArea.toLocaleString()} m² Total Area
                  </p>
                </div>
                <h3 className="text-[16px] font-semibold text-[#0f172a] mb-3">Select a Production Zone</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedFactory.zones.map((zone) => {
                    const counts = getZoneCounts(zone);
                    return (
                      <div
                        key={zone.id}
                        onClick={() => handleZoneClick(zone)}
                        className="bg-white rounded-lg border-2 border-[#e2e8f0] hover:border-[#2196F3] hover:shadow-lg transition-all cursor-pointer p-6 group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{getZoneIcon(zone.type)}</div>
                            <div>
                              <h3 className="text-[15px] font-bold text-[#0f172a] group-hover:text-[#2196F3] transition-colors">
                                {zone.name}
                              </h3>
                              <p className="text-[11px] text-[#64748b] mt-1">{zone.description}</p>
                              <p className="text-[10px] text-[#94a3b8] mt-1">Area: {zone.area.toLocaleString()} m²</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#2196F3] transition-colors flex-shrink-0" />
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
                          <div className="flex items-center justify-between text-[11px] mb-2">
                            <span className="text-[#64748b]">Production Lines:</span>
                            <span className="font-semibold text-[#0f172a]">{zone.productionLines.length}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                              <span className="text-[#64748b]">Ready: {counts.commissioned}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#60a5fa]"></span>
                              <span className="text-[#64748b]">Active: {counts.inProgress}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#f87171]"></span>
                              <span className="text-[#64748b]">Issues: {counts.issue}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span>
                              <span className="text-[#64748b]">Testing: {counts.testing}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PRODUCTION LINES VIEW */}
            {viewLevel === "lines" && selectedZone && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-[20px] font-bold text-[#0f172a]">{selectedZone.name}</h2>
                  <p className="text-[13px] text-[#64748b] mt-1">{selectedZone.description}</p>
                </div>
                <h3 className="text-[16px] font-semibold text-[#0f172a] mb-3">Select a Production Line</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedZone.productionLines.map((line) => {
                    const counts = getLineCounts(line);
                    return (
                      <div
                        key={line.id}
                        onClick={() => handleLineClick(line)}
                        className="bg-white rounded-lg border-2 border-[#e2e8f0] hover:border-[#f59e0b] hover:shadow-lg transition-all cursor-pointer p-6 group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-[16px] font-bold text-[#0f172a] group-hover:text-[#f59e0b] transition-colors">
                              {line.name}
                            </h3>
                            <p className="text-[12px] text-[#64748b] mt-1">Line: {line.lineNumber}</p>
                            <p className="text-[11px] text-[#94a3b8] mt-1">Capacity: {line.capacity}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#f59e0b] transition-colors flex-shrink-0" />
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
                          <div className="flex items-center justify-between text-[11px] mb-2">
                            <span className="text-[#64748b]">Equipment:</span>
                            <span className="font-semibold text-[#0f172a]">{line.equipment.length}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                              <span className="text-[#64748b]">Ready: {counts.commissioned}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#60a5fa]"></span>
                              <span className="text-[#64748b]">Active: {counts.inProgress}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#f87171]"></span>
                              <span className="text-[#64748b]">Issues: {counts.issue}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span>
                              <span className="text-[#64748b]">Testing: {counts.testing}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* EQUIPMENT VIEW */}
            {viewLevel === "equipment" && selectedLine && (
              <div className="space-y-3">
                <div className="mb-4">
                  <h2 className="text-[20px] font-bold text-[#0f172a]">{selectedLine.name}</h2>
                  <p className="text-[13px] text-[#64748b] mt-1">
                    Line: {selectedLine.lineNumber} | Capacity: {selectedLine.capacity}
                  </p>
                </div>
                {selectedLine.equipment.map((equipment) => {
                  return (
                    <div
                      key={equipment.id}
                      className="bg-white rounded-lg border border-[#e2e8f0] hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 p-4">
                        {/* Equipment Status Badge */}
                        <div className="flex-shrink-0">
                          <StatusBadge status={equipment.status} />
                        </div>

                        {/* Equipment Info */}
                        <div className="flex-1">
                          <div className="text-[13px] font-bold text-[#0f172a] mb-1">{equipment.name}</div>
                          <div className="flex items-center gap-3 text-[11px] text-[#64748b] flex-wrap">
                            <span>📍 {equipment.location}</span>
                            <span>⚙️ {equipment.type}</span>
                            {equipment.powerRating && <span>⚡ {equipment.powerRating}</span>}
                          </div>
                        </div>

                        {/* Arrow Button */}
                        <button
                          onClick={() => setExpandedEquipment(expandedEquipment === equipment.id ? null : equipment.id)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                        >
                          <svg
                            className={`w-4 h-4 text-[#64748b] transition-transform ${
                              expandedEquipment === equipment.id ? "rotate-90" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Expanded Details */}
                      {expandedEquipment === equipment.id && (
                        <div className="border-t border-[#e2e8f0] p-4 bg-[#f8fafc]">
                          <div className="grid grid-cols-2 gap-4 text-[12px]">
                            <div>
                              <div className="text-[#64748b] mb-1">Contractor:</div>
                              <div className="font-semibold text-[#0f172a]">{equipment.contractor || "N/A"}</div>
                            </div>
                            <div>
                              <div className="text-[#64748b] mb-1">Power Rating:</div>
                              <div className="font-semibold text-[#0f172a]">{equipment.powerRating || "N/A"}</div>
                            </div>
                            {equipment.testResult && (
                              <div className="col-span-2">
                                <div className="text-[#64748b] mb-1">Test Result / Status:</div>
                                <div className={`inline-block px-3 py-1 rounded text-[11px] font-semibold ${
                                  equipment.testResult.toLowerCase().includes("pass") || 
                                  equipment.testResult.toLowerCase().includes("commission") ||
                                  equipment.testResult.toLowerCase().includes("operational") ||
                                  equipment.testResult.toLowerCase().includes("qualified") ||
                                  equipment.testResult.toLowerCase().includes("validated")
                                    ? "bg-green-100 text-green-700"
                                    : equipment.testResult.toLowerCase().includes("fail") || 
                                      equipment.testResult.toLowerCase().includes("error")
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}>
                                  {equipment.testResult}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Issues & Commissioning */}
      <div className="w-[320px] bg-white border-l border-[#e2e8f0] flex-shrink-0 overflow-y-auto hidden lg:block">
        <div className="p-4">
          <h2 className="text-[16px] font-bold text-[#0f172a] mb-4">Equipment Status & Issues</h2>

          {/* Filters Tabs */}
          <div className="flex items-center gap-1 mb-4 border-b border-[#e2e8f0]">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-2 text-[12px] font-medium ${
                selectedFilter === "all" ? "text-[#10b981] border-b-2 border-[#10b981]" : "text-[#64748b]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter("open")}
              className={`px-3 py-2 text-[12px] font-medium ${
                selectedFilter === "open" ? "text-[#10b981] border-b-2 border-[#10b981]" : "text-[#64748b]"
              }`}
            >
              Issues ({getOpenCount()})
            </button>
            <button
              onClick={() => setSelectedFilter("resolved")}
              className={`px-3 py-2 text-[12px] font-medium ${
                selectedFilter === "resolved" ? "text-[#10b981] border-b-2 border-[#10b981]" : "text-[#64748b]"
              }`}
            >
              Ready ({getResolvedCount()})
            </button>
          </div>

          {/* Open Issues List */}
          <div className="space-y-3">
            <div>
              <button className="flex items-center gap-2 text-[12px] font-semibold text-[#0f172a] mb-2 w-full">
                <ChevronUp className="w-4 h-4" />
                <span>Open Issues ({getOpenCount()})</span>
              </button>
              <div className="space-y-2 ml-2 max-h-[500px] overflow-y-auto">
                {mockManufacturingData.flatMap((factory) =>
                  factory.zones.flatMap((zone) =>
                    zone.productionLines.flatMap((line) =>
                      line.equipment
                        .filter((equipment) => equipment.status === "issue")
                        .map((equipment) => (
                          <div key={equipment.id} className="border-l-2 border-red-500 pl-3 py-2">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500 mt-1 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="text-[12px] font-semibold text-[#0f172a]">{equipment.name}</div>
                                <div className="text-[10px] text-[#64748b] mt-1">{equipment.type}</div>
                                <div className="mt-2 text-[9px] text-[#64748b] space-y-1">
                                  <div>🏭 {factory.name}</div>
                                  <div>📍 {zone.name}</div>
                                  <div>🔧 {line.name}</div>
                                  {equipment.contractor && <div>👷 {equipment.contractor}</div>}
                                  {equipment.testResult && (
                                    <div className="text-red-600 font-medium">⚠️ {equipment.testResult}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    )
                  )
                )}
              </div>
            </div>

            {/* Testing in Progress */}
            <div className="mt-4">
              <button className="flex items-center gap-2 text-[12px] font-semibold text-[#0f172a] mb-2 w-full">
                <ChevronDown className="w-4 h-4" />
                <span>Testing & Commissioning</span>
              </button>
            </div>

            {/* Commissioned Section */}
            <div>
              <button className="flex items-center gap-2 text-[12px] font-semibold text-[#0f172a] mb-2 w-full">
                <ChevronDown className="w-4 h-4" />
                <span>Ready ({getResolvedCount()})</span>
              </button>
            </div>
          </div>

          {/* Export Actions */}
          <div className="mt-6 pt-4 border-t border-[#e2e8f0]">
            <div className="text-[11px] text-[#64748b] mb-2">Export Reports</div>
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-2 text-[11px] text-[#10b981] hover:text-[#059669] font-medium">
                <span>📊</span>
                Installation Progress
              </button>
              <button className="flex items-center gap-2 text-[11px] text-[#10b981] hover:text-[#059669] font-medium">
                <span>⚙️</span>
                Equipment List
              </button>
              <button className="flex items-center gap-2 text-[11px] text-[#10b981] hover:text-[#059669] font-medium">
                <span>📧</span>
                Email Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
