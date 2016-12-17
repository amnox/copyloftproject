class ParentContainer extends React.Component{
	constructor(props){
		super(props);
		this.holder=this.holder.bind(this);
		this.state=props.data.object;
	}
	
	holder(){
		return(
	            <div className="panel with-nav-tabs panel-primary">
	            	<NavTabs tabs={this.props.data.object.tabs}/>
	            
	            <div className="panel-body">
	                <TabBody body={this.props.data.object.body}/>
	            </div>
	        </div>
		);
	}
		render() {
		    return (<this.holder/>);
		 }
	}
class NavTabs extends React.Component{
	constructor(props){
		super(props);
		this.state={
	    		items:props.tabs
	    };
		this.tabs=this.tabs.bind(this);
		this.tabList=this.tabList.bind(this);
		this.tab=this.tab.bind(this);
		//this.remove=this.remove.bind(this);
		this.bruteforce=this.bruteforce.bind(this);
		
	}

	bruteforce(){
		addTab();
		this.forceUpdate();
	}
	tab(props){
		return(
			<li className={props.cls} id='fucktabs'><a href={props.href} data-toggle="tab">{props.name}<img onClick={() => remove(props.id)}/></a></li>	
		);
	}
	tabList(props){
		const listItems = this.props.tabs.map((item) =>
		<this.tab cls={item.cls} href={item.href} name={item.name} key={item.key} id={item.key}/>
		
		);
		return(<ul className="nav nav-tabs">
			{listItems}
			<li><img className="add-more" onClick={this.bruteforce}/></li>
		</ul>);
	}
	tabs(props){
		return(
			<div className="panel-heading">
                <this.tabList/>
            </div>
		);
	}
	render(){
		return(<this.tabs/>)
	}
}
class TabBodyUpload extends React.Component{
	constructor(props){
		super(props);
		this.upload_area=this.upload_area.bind(this);
	}
	upload_area(props){
		return(<div id={props.upload} className="dropzone" ></div>);
	}

	componentDidMount() {
	      
	      if (document.getElementById(this.props.upload_id)) {
	    	  
	    	  var myDropzone = new Dropzone('div#'+this.props.upload_id, {
	    		  url:function(files){
	    			  //return("/createitem/upload/");
	    			  
	    			  return getSignedRequest(files[0]);
	    		  },
	    		  uploadMultiple:"false",
	    		  paramName: "file"+this.props.upload_id, // The name that will be used to transfer the file
	    		  maxFilesize: 24,
	    		  maxFiles: 1,
	    		  addRemoveLinks:true,
	    		  removedfile:function(file){
	    			  $(document).find(file.previewElement).remove();
	    		  },
	    		  init: function() {
	    		      this.on("maxfilesexceeded", function(file) {
	    					alert('one file per tab');
	    		            this.removeAllFiles();
	    		            this.addFile(file);
	    		      });},
	    		  accept: function(file, done) {
	    		    if (file.name == "justinbieber.jpg") {
	    		      done("Naha, you don't.");
	    		    }
	    		    else { done(); }
	    		  }
	    		});
	    	  // other code here
	    	}
	}
	render(){
		return(<this.upload_area upload={this.props.upload_id}/>);
	}
}
class BodyTabs extends React.Component{
	constructor(props){
		super(props);
		this.showTab=this.showTab.bind(this);
	}
	componentDidMount(){
		this.showTab(this.props.data.tabs.tab_keys[0]);
	}

	showTab(id,cls){
		if (document.getElementsByClassName(cls)){
			var x = document.getElementsByClassName(cls);
			for (var i = 0; i < x.length; i++) {
				x[i].style.display = "none";  
			}
			document.getElementById(id).style.display = "block";
		}
	}
	render(){return(
	    <section>
			<div className="tabs tabs-style-bar">
				<nav>
					<ul>
					  <li><a href="javascript:void(0)"  onClick={(e) => this.showTab(this.props.data.tabs.tab_keys[0],this.props.data.tabs.tab_keys[3])}>Upload</a></li>
					  <li><a href="javascript:void(0)" className="" onClick={(e) => this.showTab(this.props.data.tabs.tab_keys[1],this.props.data.tabs.tab_keys[3])}>Page</a></li>
					  <li><a href="javascript:void(0)" className="" onClick={(e) => this.showTab(this.props.data.tabs.tab_keys[2],this.props.data.tabs.tab_keys[3])}>Review</a></li>
					</ul>
				</nav>
				<div className="content-wrap">
					<section id={this.props.data.tabs.tab_keys[0]} className={this.props.data.tabs.tab_keys[3]}><TabBodyUpload upload_id={this.props.data.body.uplaod}/></section>
					<section id={this.props.data.tabs.tab_keys[1]} className={this.props.data.tabs.tab_keys[3]}><p>2</p></section>
					<section id={this.props.data.tabs.tab_keys[2]} className={this.props.data.tabs.tab_keys[3]}><p>3</p></section>
				</div>
			</div>
		</section>
	
		
	)}
}

class TabBody extends React.Component{
	constructor(props){
		super(props);
		this.state={tab_content:props.body};
		this.tab_content=this.tab_content.bind(this);
		this.tab_body=this.tab_body.bind(this);
	}
	tab_body(props){	
		//var classes=classNames({'tab-pane':true,'fade': true});
		const body= this.props.body.map((item) =>
		<div className={item.cls} id={item.id} key={item.key}><BodyTabs data={item.body}/></div>
		
		);
		return (<div className="tab-content">{body}</div>);
	}

	tab_content(props){
		return(
			   <this.tab_body />
		);
	}
	render(){
		return(<this.tab_content/>);
	}
	
}

class Data{
	constructor(){
		this.keys=[];
		this.tabs=[];
		this.body=[];
	}
	getTabs(){
		return({tabs:this.tabs})
	}
	getBody(){
		return({body:this.body})
	}
	addItems(tab,body){
		this.tabs=this.tabs.concat(tab);
		this.body=this.body.concat(body);
	}
	getObjects(){
		return({object:{
			tabs:this.tabs,body:this.body
		}});
		
	}
	getKeys(){
		return this.keys;
	}
	addKey(){
		while(true){
			var randomnumber = Math.floor((Math.random() * 100000) + 1);
		    if(this.keys.indexOf(randomnumber) > -1) continue;
		    break;
		}
		this.keys=this.keys.concat(randomnumber);
		return randomnumber;
	}
	deleteItem(id){
		var match;
		var loop = this.tabs.map(function(num) {
			  if (num.key==id){
				  match=num;
				  return num;
			  }
			});
		
		var index=this.tabs.indexOf(match);
		this.tabs.splice(index, 1);
		this.body.splice(index, 1);
		this.keys.splice(index, 1);
	}
	
}
function getSignedRequest(file){
	  var xhr = new XMLHttpRequest();
	  xhr.open("GET", "/createitem/upload/sign_s3/"+file.name+"/"+encodeURIComponent(file.type),false);
	  xhr.onreadystatechange = function(){
	    if(xhr.readyState === 4){
	      if(xhr.status === 200){
	        var response = JSON.parse(xhr.responseText);
	        
	      }
	      else{
	        return 'fuck';
	      }
	    }
	  }
	  xhr.send();
	  if (xhr.status != 200) {
		  console.log('you got fucked bro');
		  return;
		}
	  var response = JSON.parse(xhr.responseText);
      uploadFile(file, response.data, response.url);
	  
	  return '/createitem/upload/';
	  
	}
function uploadFile(file, s3Data, url){
	  var xhr = new XMLHttpRequest();
	  xhr.open("POST", s3Data.url);

	  var postData = new FormData();
	  for(var key in s3Data.fields){
	    postData.append(key, s3Data.fields[key]);
	  }
	  postData.append('file', file);

	  xhr.onreadystatechange = function() {
	    if(xhr.readyState === 4){
	      if(xhr.status === 200 || xhr.status === 204){
	        
	      }
	      else{
	        alert("Could not upload file.");
	      }
	   }
	  };
	  xhr.send(postData);
	}
const test=new Data();
function addTab(){
	var key=test.addKey();
	var bodytabs={'tab_keys':['upload_tab_'+key,'paper_tab_'+key,'review_tab_'+key,'sub-tab_'+key]};
	var bodybody={uplaod:'upload-'+key ,cockblock:['disabled','disabled']};
	var tabbody={tabs:bodytabs,body:bodybody};
	
	if (test.getKeys().length>1){
		for(var i=0;i<=test.body.length-1;i++){
			test.body[i].cls='tab-pane fade';
			test.tabs[i].cls='';

		}
		
		test.addItems([{href:"#tab"+key+"primary",name:"Primary "+key,cls:"active",'key':key}],[{id:'tab'+key+'primary',name:'aman',cls:'tab-pane fade active in','key':key,'body':tabbody}]);
		
		
	}
	else{
		test.addItems([{href:"#tab"+key+"primary",name:"Primary "+key,cls:"active",'key':key}],[{id:'tab'+key+'primary',name:'aman',cls:'tab-pane fade active in','key':key,'body':tabbody}]);
	}
	
	ReactDOM.render(<ParentContainer data={test.getObjects()}/>,document.getElementById('root'));
	var x = document.querySelectorAll('[id="fucktabs"]');
	for (var i=0;i<=x.length-1;i++){
		(x[i]).className='';
		//console.log(x[i])
	}
	var y= document.getElementsByClassName('tab-pane fade active in');
	for (var i=0;i<=y.length-1;i++){
		(y[i]).className='tab-pane fade';
		//console.log(x[i])
	}
}
function remove(e){
	test.deleteItem(e);
	
	
	
	ReactDOM.render(<ParentContainer data={test.getObjects()}/>,document.getElementById('root'));
	var x = document.querySelectorAll('[id="fucktabs"]');
	for (var i=0;i<=x.length-1;i++){
		(x[i]).className='';
		
		//console.log(x[i])
	}
	var y= document.getElementsByClassName('tab-pane');
	
	for (var i=0;i<=y.length-1;i++){
		(y[i]).className='tab-pane fade';
		
		//console.log(x[i])
	}
	var x = document.querySelectorAll('[id="fucktabs"]');
	for (var i=0;i<=x.length-1;i++){
		(x[i]).className='active';
		break;
		//console.log(x[i])
	}
	var y= document.getElementsByClassName('tab-pane');
	
	for (var i=0;i<=y.length-1;i++){
		(y[i]).className='tab-pane fade active in';
		break;
		//console.log(x[i])
	}
	
	
}
//'mimeTypes' => array('image/jpeg', 'image/png','image/jpg','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/docx','application/pdf','text/plain','application/msword','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
Dropzone.autoDiscover = false;
ReactDOM.render(<ParentContainer data={test.getObjects()}/>,document.getElementById('root'));