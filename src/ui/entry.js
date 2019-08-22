import { DELETE_EVENT } from './variables';

class SalaryComponent extends HTMLElement {
  init(entry) {
    this.description = entry.description;
    this.value = entry.value;
    this.index = entry.index;
    this.type  = entry.type;
    this.render();
  }

  render() {
    this.innerHTML = SalaryComponent.markup(
      this.description,
      this.value,
      this.type,
      this.index,
    );
    this.deleteButton = this.querySelector('.item__delete--btn');
    this.addEventListeners();
  }

  static markup(description, value, type, index) {
    return `
      <div data-type="${type}" class="item clearfix" id="item-${index}">
        <div class="item__description">${description}</div>
        <div class="right clearfix">
          <div class="item__value">${value}</div>
          <div class="item__delete">
            <button class="item__delete--btn">
              <i class="ion-ios-close-outline"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    this.deleteButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent(DELETE_EVENT, {
        bubbles: true,
        detail: this.index
      }));
      this.parentNode.removeChild(this);
    });
  }

  constructor(entry) {
    super();
    this.init(entry);
  }
}

export { SalaryComponent };
