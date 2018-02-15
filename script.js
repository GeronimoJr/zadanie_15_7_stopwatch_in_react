class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            fomrat: ``,
            lp: 0,
            results: [],
            time: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
    }
    start() {
        if (!this.state.running) {
            this.setState({running: true});
            this.watch = setInterval(() => this.count(), 10);
            this.setState({lp: ++this.state.lp});
            console.log(this.state.results);
        }
    }
    count() {
        this.setState({miliseconds: ++this.state.time.miliseconds});
        if (this.state.time.miliseconds >= 100) {
            this.setState({seconds: this.state.time.seconds += 1});
            this.setState({miliseconds: this.state.time.miliseconds = 0});
        }
        if (this.state.time.seconds >= 60) {
            this.setState({minutes: this.state.time.minutes += 1});
            this.setState({seconds: this.state.time.seconds = 0});
        }
    }
    stop() {
        this.setState({running: false});
        clearInterval(this.watch);
    }
    save() {
        let formatStr = this.state.format;
        formatStr.toString();
        let args = this.state.results;
        let check = args.length; 
        let obj = {
            lp: this.state.lp,
            format: formatStr
        }

        if (this.state.running) {
            this.setState({lp: ++this.state.lp});
            this.state.results.push(obj);
            check = args.length;
    
        } else if (this.state.lp !== check) {
            this.setState({lp: this.state.lp});
            this.state.results.push(obj);
            check = args.length;

        }
    }
    reset() {
        this.setState({miliseconds: this.state.time.miliseconds = 0});
        this.setState({seconds: this.state.time.seconds = 0});
        this.setState({minutes: this.state.time.minutes = 0});
    }
    deleteAll() {
        this.setState({results: []});
        this.setState({lp: 0});
        this.reset();
    }

    render() {
        let counter = 0;
        function pad0(value) {
            let pad = value.toString();
            if (pad.length < 2) {
                pad = '0' + pad;
            }
            return pad;
        };
        this.state.format = `${pad0(this.state.time.minutes)} : ${pad0(this.state.time.seconds)} : ${pad0(this.state.time.miliseconds)}`;
        let list = this.state.results.map((result, index) => 
            <li key={index}>Time No. {result.lp} = {result.format}</li>
        );

        return(
            <div>
                <div className="title"><h1>Stopwatch in React.js</h1></div>
                <div className="main">
                    <div className="time"><span>{pad0(this.state.time.minutes)}</span></div>
                    <div className="colon"><p>:</p></div>
                    <div className="time"><span>{pad0(this.state.time.seconds)}</span></div>
                    <div className="colon"><p>:</p></div>
                    <div className="time"><span>{pad0(this.state.time.miliseconds)}</span></div>
                </div>
                <div className="nav">
                    <button onClick={this.start.bind(this)}>Start</button>
                    <button onClick={this.stop.bind(this)}>Stop</button>
                    <button onClick={this.save.bind(this)}>Save</button>
                    <button onClick={this.reset.bind(this)}>Reset</button>
                    <button onClick={this.deleteAll.bind(this)}>Delete all</button>
                </div>
                <div className="list">
                    <ul>
                        {list}
                    </ul>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Stopwatch />,
    document.getElementById('app')
);