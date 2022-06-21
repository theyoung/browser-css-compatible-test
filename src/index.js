import Row from './row';

export default class Main extends HTMLElement {
    constructor(){
        super();
        this.getRender();
        this.$Container = this.querySelector('.container');
    }

    getRender(){
        return this.innerHTML = this.getDisplay() + this.getStyle(); 
    }

    getDisplay(){
        let browser = Main.getBrowser();
        return `
        <h3 style="text-align:center">Browser Name : ${browser.name}</h3>
        <h3 style="text-align:center">Browser Version : ${browser.version}</h3>
        <div style="text-align:center" id="legend"> </div>
        <div class="container">
        </div>
        `;
    }


    getStyle(){
        return `
        <style>
            * {
                margin:0;
                padding:0;
                border:0;
            }
            .container{
                display:flex;
                width:100%;
                height:100%;
                background-color: #f5f5f5;
                justify-content:center;
                flex-direction:row;
                align-items:center;
                margin-top:20px;
                overflow:auto;
                flex-wrap:wrap;
            }

            app-row{
                margin:10px;
                display:inline-block;
                background-color: white;
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
        this.querySelector('#legend').appendChild(new Row("Attribute Name","Tested Attribute Value","Supported"));
        this.doUpdate();
    }

    doUpdate(){
        let styles = document.defaultView.getComputedStyle(document.body,'');
        for(let key of styles){
            let value = styles[key];
            this.appendRow(key,value);
        };
    }

    appendRow(key,value){
        setTimeout(()=> this.$Container.appendChild(new Row(key,value,CSS.supports(key, value))),0);
    }

    disconnectedCallback(){

    }

    static getBrowser() {
        var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
        if(/trident/i.test(M[1])){
            tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
            return {name:'IE',version:(tem[1]||'')};
            }   
        if(M[1]==='Chrome'){
            tem=ua.match(/\bOPR|Edge\/(\d+)/)
            if(tem!=null)   {return {name:'Opera', version:tem[1]};}
            }   
        M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
        return {
          name: M[0],
          version: M[1]
        };
     }
}

customElements.get('main-app')?? customElements.define('main-app',Main);