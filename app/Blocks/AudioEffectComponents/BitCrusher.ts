import IEffect = require("../IEffect");
import Effect = require("../Effect");
import IModifiable = require("../IModifiable");
import App = require("../../App");


class BitCrusherComponent extends Effect implements IEffect {

    public BitCrusher: Tone.Filter;

    constructor(frequency: number, type: string, rolloff: number, Q: number) {
        super();
        this.BitCrusher = new Tone.Filter(frequency, type, rolloff);
        this.BitCrusher.setQ(Q);
    }

    Connect(modifiable:IModifiable): void{
        super.Connect(modifiable);

        this.Modifiable.Source.connect(this.BitCrusher);
        this.BitCrusher.connect(this.Modifiable.OutputGain);

    }

    Disconnect(modifiable:IModifiable): void {
        super.Disconnect(modifiable);

        this.Modifiable.Source.disconnect();
        this.Modifiable.Source.connectSeries(this.Modifiable.Source, this.Modifiable.Delay, this.Modifiable.OutputGain, App.AudioMixer.Master);

    }
}

export = BitCrusherComponent;