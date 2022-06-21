export default class Row extends HTMLElement {
    constructor(key, value, flag){
        super();
        this.key = key;
        this.value = value;
        this.flag = flag;
        this.getRender();
    }

    getRender(){
        return this.innerHTML = this.getDisplay() + this.getStyle(); 
    }


    getDisplay(){
        return `
            <ul>
                <li class="key">${this.key}</li>
                <li class="value">${this.value}</li>
                <li class="value">${this.flag}</li>
            </ul>
        `;
    }

    getStyle(){
        return `
        <style>
            li{
                display:inline-block;
                margin:10px;
            }
            .key{
                font-weight:bold;
                font-color:red;
            }
            .value{
                font-weight:lighter;
            }
        </style>
        `;
    }
    connectedCallback(){

    }

    disconnectedCallback(){

    }
}

customElements.get('app-row')?? customElements.define('app-row', Row);