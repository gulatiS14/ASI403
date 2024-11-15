new gridjs.Grid({
  columns: ["Mission Type", "Description", "Score"],
  data: [
    ["Science Mission", "Assesses the rover's capability to analyze Martian-like environments for signs of life. Key components include site investigation, sample collection, onboard analysis and data documentation.", "100 points"],
    ["Delivery Mission", "Evaluates the rover’s ability to locate, pick up and deliver objects across rugged terrain, which simulates assistance to astronauts. A drone may assist in this mission.", "100 points"],
    ["Equipment Servicing", "Tests the rover’s dexterity in operating equipment on a mock lander. Tasks include manipulating small objects, operating controls and completing maintenance operations.", "100 points"],
    ["Autonomous Navigation", "Focuses on the rover’s autonomous capabilities to navigate between GPS and visual markers without human intervention, including object recognition and obstacle avoidance.", "100 points"],
    ["System Acceptance Review", "Prior to competition, teams submit a technical review covering rover design, functionality and mission-specific capabilities. Scores affect eligibility to compete in the field challenge.", "100 points"],
  ],
  
}).render(document.getElementById("table-1"));


class TableComponent extends HTMLElement {
  static get observedAttributes() {
    return ["subtitle"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, _, newValue) {
    this[name] = newValue;
  }

  render() {
    const div = document.createElement("div");
    div.innerHTML = `
    <slot></slot>
    <sub>${this.subtitle}</sub>
    <style>
      :host {
        display: block;
        text-align: center;
      }

      sub {
        font-size: 1rem;
        font-style: italic;
      }
    </style>
  `;

    this.shadowRoot.appendChild(div);
  }
}

customElements.define("table-component", TableComponent);
