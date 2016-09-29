//初期データ
let data = []
for(let i = 0; i < 10; i += 1) {
  let item = {}
  item["title"] = "title" + i
  item["key"] = i
  item["children"] = []
  for(let j = 0; j < 10; j += 1) {
    let itemj = {}
    itemj["title"] = "title" + i + "-" + j
    itemj["key"] = i+"-"+j
    itemj["children"] = []
    for( let k = 0; k < 10; k +=1) {
      let itemk = {}
      itemk["title"] = "title" + i + "-" + j +"-" + k
      itemk["key"] = i + "-" + j + "-" + k
      itemk["children"] = []
      itemj.children.push(itemk)
    }
    item.children.push(itemj)
  }
  data.push(item)
}

//longPressのTimerを入れとく変数
let timer
//longPressか判断する変数
let longPress

// Class宣言
let Main = React.createClass({
  getInitialState: function() {
    let pos = [0]
    return {pos: pos}
  },
  mouseDown: function(e) {
    longPress = false
    timer = setTimeout(this.pressTimer, 200)
  },
  mouseUp: function(e) {
    clearTimeout(timer)
    let pos = this.state.pos
    console.log(pos)
    if(longPress) {
      pos.push(0)
      console.log("LongPress")
    } else {
      console.log("shortPress")
      pos[pos.length-1] = (data.length-1 === pos[pos.length-1] ? 0 : pos[pos.length-1] + 1)
    }
    this.setState({pos: pos})
  },
  pressTimer: function() {
    longPress = true
  },
  render: function() {
    return (
      <div onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
        <Items items={data} pos={this.state.pos.join('-')}/>
      </div>
    );
  }
})

let Item = React.createClass({
  render: function() {
    let pos = this.props.pos
    if(pos == this.props.class){
      console.log(this.props.class)
    }
    //文字列にしないと 01 と 1 が同じと判断されてしまう
    let style = {
      color: pos == this.props.class ? "red" : "#000000"
    }
    return (<div className={this.props.class} style={style}>
      {this.props.text}
      <Items items={this.props.items} pos={pos}/>
      </div>);
  }
})

let Items = React.createClass({
  render: function() {
    let pos = this.props.pos
    let posArray = pos.split('-')
    let show = true
    let items = this.props.items.map(function(item, idx) {
      let key = (""+item.key).split('-')
      for (let i = 0; i < key.length-1; i ++) {
        if (posArray.length < key.length || posArray[i] != key[i]) {
          show = false
        }
      }
      // for (let i = 0; i < posArray.length-1; i++) {
      //   if (key.length < i) {
      //     show = false
      //   }
      // }
      return (
        <Item text={item.title} class={item.key} items= {item.children} pos={pos} key={item.key}>
        </Item>
      )
    })
    if (!show) { items = ""}
    return <div className="items">{items}</div>;
  }
})

//描画
ReactDOM.render(
  <Main />,
  document.getElementById('main')
);
