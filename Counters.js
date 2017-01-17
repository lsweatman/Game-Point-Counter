/**
 * Created by lukes on 1/1/2017.
 */
var Person = React.createClass({
    getInitialState: function () {
        var test = this.props.children;
        return {textAreaValue: test}
    },
    handleAdd: function (addFactor) {
		var oldValue = this.state.textAreaValue;
		var newValue = parseInt(addFactor) + parseInt(oldValue);
        this.setState({textAreaValue: newValue});
    },
    save: function() {
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
        this.setState({editing: false});
    },
    remove: function() {
        this.props.onRemove(this.props.index);
    },
    render: function() {
        return (
            <div className="person">
                <span>
                    <button id="sub10Button" className="btn btn-primary standardButton" onClick={this.handleAdd.bind(this, -10)}>-10</button>
                    <button id="sub4Button" className="btn btn-primary standardButton" onClick={this.handleAdd.bind(this, -4)}>-4</button>
                    <button id="sub1Button" className="btn btn-primary standardButton" onClick={this.handleAdd.bind(this, -1)}>-1</button>
                    <textarea defaultValue={this.props.children}
                              className="standardButton"
                              style={{"width":"45px","height":"27px"}}
                              value={this.state.textAreaValue}/>
                    <button id="add1Button" className="btn btn-primary standardButton" onClick={this.handleAdd.bind(this, 1)}>+1</button>
                    <button id="sub4Button" className="btn btn-primary standardButton" onClick={this.handleAdd.bind(this, 4)}>+4</button>
                    <button id="add10Button" className="btn btn-primary standardButton" onClick={this.handleAdd.bind(this, 10)}>+10</button>
                    <button onClick={this.remove}
                            id="delete-button"
                            className="btn btn-danger standardButton">
                        <span className="glyphicon glyphicon-trash"
                              style={{"vertical-align":"-5px"}}>{}</span>
                    </button>
                    <input type="text" className="standardTextBox"/>
                </span>
            </div>
        );
    }
});

var Board = React.createClass({
    propTypes: {
        count: function(props, propName) {
            if (typeof props[propName] !== "number"){
                return new Error('The count property must be a number');
            }
            if (props[propName] > 100) {
                return new Error("Creating " + props[propName] + " notes is ridiculous");
            }
        }
    },
    getInitialState: function() {
        var initialJSONObject = {
            "players": [0,0,0]
        };
        //Store if not found
        if (window.localStorage.getItem("storedScores") === null) {
            window.localStorage.setItem("storedScores", JSON.stringify(initialJSONObject));
        }

        //Grab the stored object
        var storedJSON = window.localStorage.getItem("storedScores");
        var playersArray = JSON.parse(storedJSON).players;
        //alert(playersArray.toString());
        //Return the player key
        return {
            scores: playersArray
        };
    },
    componentWillUnmount: function () {
        var finalStorageJSON = {
            "players": this.state.notes
        };
        alert(JSON.stringify(finalStorageJSON));
        window.localStorage.setItem("storedScores", JSON.stringify(finalStorageJSON));
    },
    update: function(newScore, i) {
        var arr = this.state.scores;
        arr[i] = newScore;
        this.setState({scores:arr});
    },
    remove: function(i) {
        var arr = this.state.scores;
        arr.splice(i, 1);
        this.setState({scores: arr});
    },
    add: function(number) {
        var arr = this.state.scores;
        arr.push(number);
        this.setState({scores: arr});
    },
    eachScore: function(score, i) {
        return (
            <Person key={i}
        index={i}
        onChange={this.update}
        onRemove={this.remove}
        >{score}</Person>
        );
    },
    render: function() {
        return (<div className="board">
            {this.state.scores.map(this.eachScore)}
            <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                    onClick={this.add.bind(null, 0)}/>
        </div>
        );
    }
});

ReactDOM.render(<Board count={4}/>, document.getElementById('react-container'));