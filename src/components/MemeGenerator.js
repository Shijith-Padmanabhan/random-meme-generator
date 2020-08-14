import React from 'react';

class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state = {
            topText : '',
            bottomText : '',
            randomImg : 'https://i.imgflip.com/1bij.jpg',
            allMemeImgs : []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        let url = 'https://api.imgflip.com/get_memes'
        fetch(url)
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            this.setState({
                allMemeImgs : memes
            })
        })  
    }

    handleSubmit(e){
        e.preventDefault();
        const rand = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randomMeme = this.state.allMemeImgs[rand].url
        this.setState({
            randomImg : randomMeme
        })
    }


    handleChange(event){
        const {name,value} = event.target
        this.setState({
            [name] : value
        })
    }
    
        

    render(){
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        value={this.state.topText} 
                        name="topText" 
                        onChange={this.handleChange}
                        placeholder="Top Text"
                    />
                    <input 
                        type="text" 
                        value={this.state.bottomText}
                        name="bottomText" 
                        onChange={this.handleChange}
                        placeholder="Bottom Text"
                    />
                    <button>Gen</button>
                </form>

                <div className="meme">
                    <img src = {this.state.randomImg} alt=""/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;