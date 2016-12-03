var MyBooks = [1,2,3,4,5];
var unique_counter=0;
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    		items:[],big_items:[]
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.increment = this.increment.bind(this);
    this.other_increment = this.other_increment.bind(this);
    this.show_this = this.show_this.bind(this);
    this.wrapper=this.wrapper.bind(this);
    this.kill_me_please=this.kill_me_please.bind(this);
  }
  wrapper(){
	return(
            <div className="panel with-nav-tabs panel-primary">
            <div className="panel-heading">
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#tab1primary" data-toggle="tab">Primary 1</a></li>
                        <li><a href="#tab2primary" data-toggle="tab">Primary 2</a></li>
                        <li><a href="#tab3primary" data-toggle="tab">Primary 3</a></li>
                        <li className="dropdown">
                            <a href="#" data-toggle="dropdown">Dropdown <span className="caret"></span></a>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="#tab4primary" data-toggle="tab">Primary 4</a></li>
                                <li><a href="#tab5primary" data-toggle="tab">Primary 5</a></li>
                            </ul>
                        </li>
                    </ul>
            </div>
            <div className="panel-body">
                <div className="tab-content">
                    <div className="tab-pane fade in active" id="tab1primary">Primary 1</div>
                    <div className="tab-pane fade" id="tab2primary">Primary 2</div>
                    <div className="tab-pane fade" id="tab3primary">Primary 3</div>
                    <div className="tab-pane fade" id="tab4primary">Primary 4</div>
                    <div className="tab-pane fade" id="tab5primary">Primary 5</div>
                </div>
            </div>
        </div>
	);
  }
  increment(){
	  unique_counter=unique_counter+1;
	  //MyBooks.push(unique_counter);
	  this.state.items.push(unique_counter);
	  draw_item_list();
  }
  other_increment(){
	  
	  //MyBooks.push(unique_counter);
	  this.state.big_items.push(unique_counter);
	  draw_item_list();
  }
  show_this(num){
	  alert(num);
  }
  handleClick() {
	  //const numbers = [1, 2, 3, 4, 5];
	  const listItems = this.state.items.map((number) =>
	    <li key={number.toString()}>{number}</li>
	  );
	  return (
	    <div className="well">
		<ul >{listItems}</ul>
		<button onClick={this.increment}>Click</button>
		</div>
	  );
  }
  kill_me_please(){
	  const listItems = this.state.big_items.map((number) =>
	  	<this.handleClick key={number.toString()}/>
	  );
	  return (
	    <div className="well">
		<ul >{listItems}</ul>
		<button onClick={this.other_increment}>Click</button>
		</div>
	  );
  }
  render() {
    return (<this.kill_me_please/>);
  }
}

function draw_item_list(){
	ReactDOM.render(<List />,document.getElementById('root'));
}
draw_item_list();
