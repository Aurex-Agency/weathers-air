export interface ServiceLocation { slug: string; city: string; state: string; county: string; focus: string; intro: string; sections: {heading: string; text: string}[]; tips: string[]; faq: {question: string; answer: string}; sources: {url: string; label: string}[]; related: string[]; }

// Local facts researched October 1, 2026. Guidance is conditional, not a claim of completed local projects.
export const locations: ServiceLocation[] = [
  {
    "slug": "columbus-ms",
    "city": "Columbus",
    "state": "MS",
    "county": "Lowndes",
    "focus": "Older homes, additions and uneven temperatures",
    "intro": "Our home base is Columbus, at 506 13th Street North. From an older house in South Columbus to a business planning equipment replacement, the starting point is the building itself: how it is used, where comfort falls short and what the existing system can realistically deliver.",
    "sections": [
      {
        "heading": "Comfort in South Columbus homes",
        "text": "The Mississippi Department of Archives and History documents South Columbus buildings spanning architectural styles from the 1820s through the 1930s. That history matters when planning a modern comfort upgrade. In an older house, ask for an assessment of available duct space, return-air paths and insulation before choosing equipment. A newer air conditioner alone may not fix a room separated from the main return by a closed door."
      },
      {
        "heading": "Plan around the whole house",
        "text": "Tell us about enclosed porches, converted attics or additions, especially if those rooms never match the thermostat. These changes can alter heating and cooling needs. Weathers can discuss repair, replacement and ductwork options with you, starting with the symptom rather than assuming the largest system is the best fit. Keep the previous equipment information and any renovation drawings available for the visit."
      }
    ],
    "tips": [
      "List which rooms are uncomfortable and at what time of day.",
      "Point out additions and any ductwork changed during remodeling.",
      "For an older property, discuss equipment placement before installation."
    ],
    "faq": {
      "question": "Will a larger AC fix my hot upstairs rooms?",
      "answer": "Not necessarily. Airflow, duct leakage, insulation and room layout all matter. A building assessment should come before a size recommendation; buying more capacity without addressing distribution can leave the original problem unresolved."
    },
    "sources": [
      {
        "url": "https://www.apps.mdah.ms.gov/public/district.aspx?id=102&view=facts",
        "label": "MDAH: South Columbus Historic District"
      }
    ],
    "related": [
      "starkville-ms",
      "west-point-ms",
      "caledonia-ms"
    ]
  },
  {
    "slug": "starkville-ms",
    "city": "Starkville",
    "state": "MS",
    "county": "Oktibbeha",
    "focus": "Rental turnover and comfort near campus",
    "intro": "Starkville combines a university community with established residential neighborhoods. A family home, a student rental and a ground-floor business can have very different comfort schedules. Weathers helps you frame the right service request, whether you need an AC diagnosis or are planning work between occupants.",
    "sections": [
      {
        "heading": "A plan for Cotton District rentals",
        "text": "The Cotton District sits beside Mississippi State University and includes housing, shopping and dining. For a rental there or elsewhere in Starkville, an HVAC visit is easier when the owner and tenant agree on access and responsibility beforehand. Arrange permission to enter, identify who can approve a repair and share the thermostat instructions with incoming occupants."
      },
      {
        "heading": "Use a vacancy window well",
        "text": "Between leases, consider checking the filter, condensate drainage and operation before furniture makes equipment harder to reach. Record model numbers and maintenance dates for the next tenant. If the complaint is a warm bedroom with its door closed, ask about return airflow rather than immediately replacing the thermostat. For a business sharing a building with residences, explain the separate operating hours and any zones that behave differently."
      }
    ],
    "tips": [
      "Provide the unit number and an onsite contact for rental properties.",
      "Identify the person authorized to approve repair costs.",
      "Mention move-in dates when requesting a maintenance visit."
    ],
    "faq": {
      "question": "Can I arrange service for a tenant while I am away?",
      "answer": "Call the office with the property address, tenant contact and access arrangements. Confirm who will authorize work and receive updates before an appointment is scheduled. An online request does not reserve a specific arrival time."
    },
    "sources": [
      {
        "url": "https://starkville.org/places/cotton-district/",
        "label": "Greater Starkville Development Partnership: Cotton District"
      }
    ],
    "related": [
      "columbus-ms",
      "west-point-ms",
      "louisville-ms"
    ]
  },
  {
    "slug": "west-point-ms",
    "city": "West Point",
    "state": "MS",
    "county": "Clay",
    "focus": "Downtown businesses and household schedules",
    "intro": "West Point is part of the Golden Triangle alongside Columbus and Starkville. Its downtown storefronts and surrounding residential community call for service that considers how each space is occupied. Tell Weathers whether you need help keeping customers comfortable during business hours or solving a recurring problem at home.",
    "sections": [
      {
        "heading": "Downtown comfort during the working day",
        "text": "Visit Mississippi identifies historic Murff Row as part of downtown West Point. In a storefront setting, frequently opened doors and changing customer traffic can affect comfort differently from an empty building. When reporting a problem, explain whether it occurs before opening, during a busy period or all day. That timing is more useful for diagnosis than a thermostat reading on its own."
      },
      {
        "heading": "Separate equipment trouble from building needs",
        "text": "If a room stays warm while the rest of the building cools normally, note the location of supply registers and any blocked returns. For a commercial visit, gather the equipment list and explain which areas share a thermostat. For a home, let us know whether a bedroom, sun-facing room or addition is the main concern. Repair, maintenance and replacement decisions should follow those details, not just equipment age."
      }
    ],
    "tips": [
      "Share opening hours and any times equipment must remain running.",
      "Identify roof or mechanical-room access requirements.",
      "Keep a short log of temperatures during the busiest part of the day."
    ],
    "faq": {
      "question": "Should a business wait until the AC stops completely?",
      "answer": "A change in comfort, new noise or repeated cycling is worth reporting before a complete shutdown. Ask about a diagnostic visit and describe the effect on your business. The office can discuss appointment availability without assuming an immediate repair is possible."
    },
    "sources": [
      {
        "url": "https://visitmississippi.org/experiences/eat-stay-play-west-point/",
        "label": "Visit Mississippi: West Point"
      }
    ],
    "related": [
      "columbus-ms",
      "starkville-ms",
      "aberdeen-ms"
    ]
  },
  {
    "slug": "aberdeen-ms",
    "city": "Aberdeen",
    "state": "MS",
    "county": "Monroe",
    "focus": "Thoughtful HVAC upgrades in established buildings",
    "intro": "Aberdeen has documented historic districts, including its downtown and West Commerce Street. For an owner improving an established property, comfort work should account for both the equipment and the space available to install it. Weathers can help you discuss repair and replacement priorities without treating every building as new construction.",
    "sections": [
      {
        "heading": "Start with the existing layout",
        "text": "An older building may have equipment or ductwork added long after it was built. That does not automatically mean it needs replacement. Before a visit, note where the air handler sits, which rooms have returns and whether any rooms have been repurposed. Mention access through narrow stairs, ceiling panels or crawlspaces so the scope of the visit can be discussed."
      },
      {
        "heading": "Make renovation decisions together",
        "text": "If you are renovating in Aberdeen, review comfort plans alongside changes to walls, windows and insulation. A replacement selected before those decisions may not reflect the finished building. For a property subject to historic review, ask the relevant local office about exterior placement or visible alterations before finalizing work. We do not assume every older property is in a designated district or that every upgrade needs the same approvals."
      }
    ],
    "tips": [
      "Bring any previous service records or renovation plans.",
      "Identify difficult access to indoor equipment and ducts.",
      "Discuss visible exterior changes early in an older-property project."
    ],
    "faq": {
      "question": "Do older Aberdeen homes always need new ductwork?",
      "answer": "No. Condition, leakage, sizing and access should be assessed first. Repairing a specific section may be appropriate, while other buildings need more extensive changes. Cleaning ducts and repairing leaking ducts address different problems."
    },
    "sources": [
      {
        "url": "https://www.apps.mdah.ms.gov/nom/dist/145.pdf",
        "label": "MDAH: Aberdeen Downtown Historic District"
      }
    ],
    "related": [
      "amory-ms",
      "west-point-ms",
      "columbus-ms"
    ]
  },
  {
    "slug": "amory-ms",
    "city": "Amory",
    "state": "MS",
    "county": "Monroe",
    "focus": "Matching equipment to the home you have today",
    "intro": "Amory grew around a planned railroad town. The city describes both its original Railroad Subdivision and later residential development, a useful reminder that homes across town do not all have the same layout or equipment history. Weathers approaches a comfort concern by asking what has changed in your particular house.",
    "sections": [
      {
        "heading": "Different generations of homes need different questions",
        "text": "In an established Amory home, ask whether an addition or previous remodel changed the area served by the system. In a newer house, review the operating instructions and warranty records before assuming a comfort issue requires replacement. In either case, identify whether all rooms are affected or the problem is isolated to one part of the building."
      },
      {
        "heading": "When replacement is on the table",
        "text": "Bring the age and repair history of the current system to the conversation. Ask what a proposed replacement includes: indoor and outdoor equipment, controls, duct connections and commissioning. If a home has changed substantially, the old equipment size is not enough information for selecting new equipment. A clear written scope helps you compare options and understand which comfort concerns the work is intended to solve."
      }
    ],
    "tips": [
      "Note alterations made since the current system was installed.",
      "Have model numbers and warranty paperwork available.",
      "Ask which existing components would remain in a replacement project."
    ],
    "faq": {
      "question": "Can a working outdoor unit still be part of a comfort problem?",
      "answer": "Yes. Indoor airflow, controls, ducts and the indoor coil are part of the same system. Describe both indoor and outdoor symptoms so a service assessment considers more than the component that is easiest to see."
    },
    "sources": [
      {
        "url": "https://www.cityofamoryms.gov/history",
        "label": "City of Amory: History"
      }
    ],
    "related": [
      "aberdeen-ms",
      "caledonia-ms",
      "vernon-al"
    ]
  },
  {
    "slug": "caledonia-ms",
    "city": "Caledonia",
    "state": "MS",
    "county": "Lowndes",
    "focus": "A practical handoff for moving households",
    "intro": "Caledonia describes a strong community of military personnel and retirees, with Columbus Air Force Base nearby. For a household moving in or preparing to leave, a clear picture of HVAC condition is useful. Weathers can discuss maintenance, an existing comfort complaint or questions about the equipment in your next home.",
    "sections": [
      {
        "heading": "Get familiar with an unfamiliar system",
        "text": "After a move, locate the filter, thermostat instructions and indoor equipment before the first service problem. Record the filter size and the last known maintenance date. Ask the previous owner or property manager for service records instead of assuming a recently cleaned house means the system was serviced. If you are renting, get the owner’s authorization before arranging work."
      },
      {
        "heading": "Avoid surprises during a move",
        "text": "For a house being sold or vacated, explain the schedule and the exact concern when you call. A maintenance appointment, a repair diagnosis and a real-estate inspection are different scopes; confirm what is needed. If a family member will meet the technician, share the contact number and approval arrangements in advance. Weathers is an independent business; proximity to the base does not imply military affiliation."
      }
    ],
    "tips": [
      "Photograph the equipment labels for your household records.",
      "Ask where filters go and how often the manufacturer recommends checking them.",
      "Confirm access and approval if the owner will be out of town."
    ],
    "faq": {
      "question": "What should I check first after moving into a Caledonia home?",
      "answer": "Find the filter and thermostat instructions, check that supply and return vents are unobstructed, and collect maintenance records. If the system is not performing normally, report the symptoms and equipment information to the office before changing parts."
    },
    "sources": [
      {
        "url": "https://caledoniams.net/about/",
        "label": "Town of Caledonia: About"
      }
    ],
    "related": [
      "columbus-ms",
      "amory-ms",
      "vernon-al"
    ]
  },
  {
    "slug": "macon-ms",
    "city": "Macon",
    "state": "MS",
    "county": "Noxubee",
    "focus": "Clear service arrangements for town and outlying addresses",
    "intro": "Macon sits at US Highway 45 and Mississippi Highway 14, south of Columbus. An address in town and a property reached from a rural road need different arrival instructions. When you contact Weathers, share the actual service address along with the heating or cooling concern so the office can confirm arrangements.",
    "sections": [
      {
        "heading": "Make the first visit easier to plan",
        "text": "For a property outside the town center, include the entrance to use, gate instructions and a contact who can meet the technician. A mailing address alone may not identify the correct building. If several structures share the property, explain whether the request is for the house, an office or a separate conditioned space; they may use different systems."
      },
      {
        "heading": "Describe intermittent problems clearly",
        "text": "A system that works in the morning but struggles later needs a description of that pattern. Note thermostat settings, whether the fan runs and which rooms are affected. For a seasonal maintenance request, have filter sizes and equipment details available. Do not remove electrical covers or handle refrigerant to gather information. Safe observations and good access details are enough to start the service conversation."
      }
    ],
    "tips": [
      "Provide the physical address rather than only a post-office box.",
      "Identify the correct building if the property has several systems.",
      "Mention gates, animals or access limitations before the visit."
    ],
    "faq": {
      "question": "Can you check an address outside Macon city limits?",
      "answer": "Yes, contact the office with the exact address and service needed to confirm coverage and scheduling. The town name helps identify the area, but a listed location does not establish an arrival time or a fixed travel charge."
    },
    "sources": [
      {
        "url": "https://www.cityofmacon.org/node/4",
        "label": "City of Macon: Welcome"
      }
    ],
    "related": [
      "columbus-ms",
      "louisville-ms",
      "aliceville-al"
    ]
  },
  {
    "slug": "louisville-ms",
    "city": "Louisville",
    "state": "MS",
    "county": "Winston",
    "focus": "Coordinate HVAC work with a remodel",
    "intro": "Louisville homeowners planning an improvement have more to consider than the outdoor unit. The city maintains a Code Enforcement division, and larger projects may involve coordination beyond an equipment choice. Weathers can discuss the HVAC part of your project and the information needed before work is scheduled.",
    "sections": [
      {
        "heading": "Define the project before choosing equipment",
        "text": "Tell us if your Louisville project changes floor area, room use or the building envelope. An enclosed garage used as living space, for example, introduces different needs than an equipment swap serving unchanged rooms. Ask for a scope that separates equipment, ductwork, controls and any related work so you know what is included and what needs separate coordination."
      },
      {
        "heading": "Leave time for the details",
        "text": "Discuss current permit and inspection requirements with the appropriate local office as the project is planned; do not infer them from a generic online checklist. If other trades are working onsite, coordinate access to the mechanical space before walls or ceilings are closed. For an existing system repair, describe the fault separately from future renovation plans so the immediate need is clear."
      }
    ],
    "tips": [
      "Share drawings or room-use changes when requesting an estimate.",
      "Identify any deadlines involving other contractors.",
      "Confirm address coverage and appointment options with the Columbus office."
    ],
    "faq": {
      "question": "Can I keep my current HVAC system after adding a room?",
      "answer": "Possibly, but the added space and changes to airflow need assessment. Extending a duct without checking system capacity and distribution may leave both the new and existing rooms uncomfortable. Discuss the finished layout before deciding."
    },
    "sources": [
      {
        "url": "https://www.cityoflouisvillems.com/code-enforcement-zoning1.html",
        "label": "City of Louisville: Code Enforcement"
      }
    ],
    "related": [
      "starkville-ms",
      "macon-ms",
      "columbus-ms"
    ]
  },
  {
    "slug": "aliceville-al",
    "city": "Aliceville",
    "state": "AL",
    "county": "Pickens",
    "focus": "Home comfort at the Mississippi–Alabama border",
    "intro": "Aliceville is in southern Pickens County near the Mississippi border, with agricultural and forestry activity documented by Atlas Alabama. For homes and small businesses here, a service request should describe the property as well as the problem. Weathers works in Alabama from its Columbus, Mississippi base.",
    "sections": [
      {
        "heading": "Keep outdoor equipment accessible",
        "text": "If your Aliceville property has trees, landscaping or outdoor work near the condenser, look for visible leaves or objects restricting the area around it. Keep the manufacturer’s recommended clearance and avoid placing storage against the unit. Do not open panels or reach into the fan. Mention repeated debris buildup when arranging maintenance so the equipment surroundings can be considered."
      },
      {
        "heading": "Ask what an equipment quote actually covers",
        "text": "For an aging system, compare the scope of repair with a replacement proposal. Ask about the indoor equipment match, controls and existing duct connections, not simply the price of the outdoor unit. If the home also has a separate office or workshop, identify it as a separate space when calling. Its occupancy and conditioning needs may be different from the main house."
      }
    ],
    "tips": [
      "Tell the office that the service address is in Alabama.",
      "Note vegetation or storage limiting equipment access.",
      "List separately conditioned buildings when requesting maintenance."
    ],
    "faq": {
      "question": "Does crossing the state line change how I request service?",
      "answer": "Use the same Weathers phone number or contact form and include the full Alabama address. The office will confirm the service requested, address coverage and scheduling. Weathers is based in Columbus; this page does not represent an Aliceville branch office."
    },
    "sources": [
      {
        "url": "https://www.atlasalabama.gov/municipalities/aliceville/",
        "label": "Atlas Alabama: Aliceville"
      }
    ],
    "related": [
      "reform-al",
      "macon-ms",
      "columbus-ms"
    ]
  },
  {
    "slug": "reform-al",
    "city": "Reform",
    "state": "AL",
    "county": "Pickens",
    "focus": "Maintenance around trees and outdoor equipment",
    "intro": "Reform’s municipal history describes the importance of forestry and lumber to this Pickens County community. Around a tree-lined property, the area outside the house deserves attention alongside the thermostat inside it. Weathers can help you discuss a maintenance visit or investigate a change in heating and cooling performance.",
    "sections": [
      {
        "heading": "Include the condenser in seasonal upkeep",
        "text": "Leaves, grass clippings and stored objects can obstruct an outdoor unit wherever they accumulate. During routine yard care, keep discharge from mowing away from equipment and visually check the surrounding space. If performance changes after outdoor work, describe what happened when you call. Cleaning a coil or opening electrical panels is different from clearing loose material safely outside the unit."
      },
      {
        "heading": "After an interruption, report the sequence",
        "text": "If your system behaves differently after a power interruption, write down what the thermostat displays and whether the indoor fan or outdoor unit runs. Do not repeatedly reset a breaker that trips. Those observations help explain the fault without guessing which part has failed. If your concern is ongoing rather than sudden, include how long the symptom has been present and any recent repairs."
      }
    ],
    "tips": [
      "Keep a record of when unusual noise or cycling began.",
      "Check for obvious obstructions without opening equipment.",
      "Tell us if the issue followed yard work or a power interruption."
    ],
    "faq": {
      "question": "Is duct cleaning the answer when an AC loses airflow?",
      "answer": "It depends on the cause. Filter restriction, blower issues and duct damage can also affect airflow. Ask for a diagnosis before choosing a cleaning service; cleaning does not repair a damaged duct or a mechanical fault."
    },
    "sources": [
      {
        "url": "https://cityofreform.com/",
        "label": "City of Reform: Community history"
      }
    ],
    "related": [
      "aliceville-al",
      "fayette-al",
      "vernon-al"
    ]
  },
  {
    "slug": "vernon-al",
    "city": "Vernon",
    "state": "AL",
    "county": "Lamar",
    "focus": "Service planning at the Highway 17 and 18 crossroads",
    "intro": "Vernon is Lamar County’s seat, served by Alabama Highways 17 and 18. Homes, offices and properties outside the center of town can have very different equipment access. For a Weathers service request, include the full address and how the building is used so the office can discuss the right next step.",
    "sections": [
      {
        "heading": "A useful first call for a business",
        "text": "If you manage a Vernon office or storefront, identify which areas lose comfort and whether one thermostat serves them all. Mention a locked mechanical room, roof access or restrictions on work during opening hours. If a landlord maintains the equipment, confirm their authorization before arranging a repair. Clear responsibility helps avoid an appointment that cannot proceed."
      },
      {
        "heading": "Make heating and cooling history part of the request",
        "text": "For a home with a heat pump, explain whether the problem occurs in heating, cooling or both. A thermostat message and the timing of the symptom are useful details; they are not a diagnosis by themselves. If maintenance has been irregular, gather whatever service history you have rather than guessing at a failed component. Discuss repair options before assuming a complete system replacement is necessary."
      }
    ],
    "tips": [
      "Specify heating, cooling or both when describing the fault.",
      "Arrange access to all equipment, not just the thermostat.",
      "Include the correct entrance for properties off the highway."
    ],
    "faq": {
      "question": "Why does the office ask about both indoor and outdoor symptoms?",
      "answer": "Heating and cooling equipment works as a system. Knowing whether the thermostat responds, the indoor fan runs and the outdoor unit operates helps frame the visit. Only make observations from a safe position and leave covers in place."
    },
    "sources": [
      {
        "url": "https://www.atlasalabama.gov/municipalities/vernon/",
        "label": "Atlas Alabama: Vernon"
      }
    ],
    "related": [
      "caledonia-ms",
      "fayette-al",
      "reform-al"
    ]
  },
  {
    "slug": "fayette-al",
    "city": "Fayette",
    "state": "AL",
    "county": "Fayette",
    "focus": "Comfort planning for spaces with changing occupancy",
    "intro": "Fayette’s civic center, arts activities and downtown events are part of the city’s community life. A shop hosting visitors or a home preparing for guests may need a different operating schedule than on an ordinary day. Weathers can discuss maintenance and comfort concerns before a busy period arrives.",
    "sections": [
      {
        "heading": "Consider occupied conditions",
        "text": "If your Fayette business is comfortable before opening but warms up with customers inside, explain the occupancy pattern during the service request. Doors opening, internal heat and operating schedules are relevant to an assessment. A thermostat adjustment alone may not resolve the underlying issue. Note whether the problem is spread across the building or concentrated in a single room."
      },
      {
        "heading": "Plan maintenance around the calendar",
        "text": "Give the office any important event or business dates when asking about appointments, while allowing time for diagnosis and any required parts. For a replacement project, ask how downtime would be managed and which portions of the building would be affected. A small office and a larger gathering space have different needs; provide the actual use and layout instead of relying only on square footage."
      }
    ],
    "tips": [
      "Describe normal and peak occupancy for a commercial space.",
      "Share dates when disruption would be especially difficult.",
      "Identify affected zones and any previous temporary fixes."
    ],
    "faq": {
      "question": "Can I request maintenance before hosting an event?",
      "answer": "Yes. Contact the office in advance with the date, address and equipment information. Scheduling and any follow-up repair depend on availability and findings, so a request should not be treated as a guaranteed completion date."
    },
    "sources": [
      {
        "url": "https://fayetteal.org/visitors/",
        "label": "City of Fayette: Visitors and community events"
      }
    ],
    "related": [
      "vernon-al",
      "reform-al",
      "columbus-ms"
    ]
  }
];
