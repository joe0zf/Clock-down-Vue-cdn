const app = new Vue({
    el:'#app',
    data:{
        dialog:false,
        name:'COMPUTACIÓN',
        remainDays:0,
        remainHours:0,
        remainMinutes:0,
        remainSeconds:null,
        remainTime:null,
        messageFinal:null,
        messageSet:"",
        fe:'',
        backgroundSet:'',
        backgroundStatus:false,
        imageStatus:false,
    },
    computed:{
        estado(){
            if(this.remainMinutes==0&&this.remainSeconds==0)
            {
                return false;
            }
            else{
                return true;
            }
        }
    },
    methods: {
        getRemainTime (deadLine) {

            let now = new Date();
            this.remainTime = (new Date(deadLine) - now + 1000)/1000;
            this.remainSeconds = ('0'+ Math.floor(this.remainTime % 60)).slice(-2);
            this.remainMinutes = ('0'+Math.floor((this.remainTime/60) % 60)).slice(-2);
            this.remainHours = ('0'+Math.floor((this.remainTime/3600) % 24)).slice(-2);
            this.remainDays = Math.floor(this.remainTime/(3600* 24));

        },
        countdown(deadLine){
            const timerUpdate = setInterval(() => {
                this.getRemainTime(deadLine);
        
                if(this.remainTime <= 1)
                    {
                        this.messageFinal = this.messageSet;
                        clearInterval(timerUpdate);
                    }
            },1000);
            
            
        },
        openDialog(){
            let ventana = document.getElementById('modal');
            this.dialog = !this.dialog;
            if(this.dialog)
            {
                ventana.showModal();
            }
            else{
                ventana.close();
            }
        },
        closeDialog(){
            let ventana = document.getElementById('modal');
            this.dialog = !this.dialog;
            if(this.dialog)
            {
                ventana.showModal();
            }
            else{
                ventana.close();
            }
        },
        selectDateTime(){
            
                this.messageFinal = ""
                let datetime = document.getElementById('fechahora');
                let color = document.getElementById('color-b');
                this.fe = datetime.value;

                if (!!this.fe) {
                    let timesel = new Date(this.fe);
                    this.countdown(timesel);

                    if(this.backgroundStatus){
                        this.backgroundSet = 'background:'+color.value+';'; 
                    }
                    this.closeDialog();  
                    
                    

                }
                else{
                    alert("Completa los datos por favor :V")
                }
        },
        changeBackgroundState(){
            this.backgroundStatus=!this.backgroundStatus;
            if (!this.backgroundStatus) {
                this.backgroundSet = "";
            }
        },
        changeImageState(){
            this.imageStatus=!this.imageStatus;
            if (!this.imageStatus) {
                
            }
        },
        selectImage(event){
            console.log(event.target.files);
        },
        playMusic(){
            let cancion =  document.getElementById('cancion');

            cancion.play();
            console.log(cancion);
        }
    },
    async created() {
        //await this.countdown('May 13 2020 11:00:00 GMT-0500');
      //  this.playMusic();
    },
    
})