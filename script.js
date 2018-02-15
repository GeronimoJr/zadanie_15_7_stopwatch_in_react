class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            fomrat: ``,
            lp: 0,
            results: [
                {
                    lp: '',
                    score: ''
                },
            ],
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
            if (this.state.running) {
                this.setState({lp: ++this.state.lp});
                this.state.results.push(this.state.lp, this.state.format);
                console.log(this.state.results);
                console.log(this.state.counter);
            }
    }
    reset() {
        this.setState({miliseconds: this.state.time.miliseconds = 0});
        this.setState({seconds: this.state.time.seconds = 0});
        this.setState({minutes: this.state.time.minutes = 0});
    }
    deleteAll() {

    }

    render() {
        let counter = 0;
        this.state.format = `${this.state.time.minutes}:${this.state.time.seconds}:${this.state.time.miliseconds}`;
        let list = this.state.results.map((result, index) => 
            <li key={index}>Czas nr. {result.lp} : {result.score}</li>
        );
        return(
            <div>
                <nav>
                    <button onClick={this.start.bind(this)}>Start</button>
                    <button onClick={this.stop.bind(this)}>Stop</button>
                    <button onClick={this.save.bind(this)}>Save</button>
                    <button onClick={this.reset.bind(this)}>Reset</button>
                    <button>Delete all</button>
                </nav>
                <main>
                    <span>{this.state.format}</span>
                </main>
                <div>
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