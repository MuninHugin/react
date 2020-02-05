import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '../../Components/UI/Button/Button'
import classes from './Layout.module.css'

class Layout extends Component {
    state = {
        content : [
            {
                type: 'panel',
                props: {
                    width: 500,
                    minHeight: 150,
                    visible: true
                }
            },
            {
                type: 'label',
                props: {
                    caption: 'test',
                    visible: true
                }
            },
            {
                type: 'button',
                props: {
                    caption: 'testButton',
                    width: 100,
                    height: 50,
                    visible: true
                }
            }
        ]
    }

    resultClick =()=> {
        let inputPath = this.inputPath.value || null
        let inputNewValue = this.inputNewValue.value || null
        const content = [...this.state.content]

        const recompose = (obj,string) =>{

            let parts = string.split(".");
            let current = obj;
            let ArLength = parts.length

            try{
                for (let i = 0; i < ArLength - 1; i++) {

                    if(parts[i].match(/content\[\d+\]/)) {
                        const contentIndexArr = parts[i].match(/\d+/)
                        const contentIndex = Number(contentIndexArr[0])

                        current = current['content'][contentIndex]
                    }
                    else current = current[parts[i]]

                    if (!current) break
                }

            if(!parts[ArLength - 1].match(/content/)) {
                if(parts[ArLength - 1] === 'visible') {
                    if(inputNewValue === 'true') current[parts[ArLength - 1]] = true
                    if(inputNewValue === 'false' || inputNewValue === null) current[parts[ArLength - 1]] = false
                }
                if(!parts[ArLength - 1].match(/width|Height|Width|height/)) current[parts[ArLength - 1]] = inputNewValue
                else current[parts[ArLength - 1]] = Number(inputNewValue)
            }
            else current[parts[ArLength - 1]] = eval('[' + inputNewValue + ']')
            return current
            } catch(error) {
                alert('Error!')
            }
        }
       recompose(this.state,inputPath)

        this.setState({content})
    }


    render() {
        const contentTags = this.state.content

        const returnContent =(obj)=> obj.map((tag, index) => {
                switch (tag.type) {
                    case 'panel':
                        return (
                            obj ?
                                tag.props.visible ?
                                <div
                                    key={index}
                                    style={{...tag.props}}
                                >{obj[index].content ? returnContent(obj[index].content) : null}</div>
                                : null
                            : null
                        )
                    case 'label':
                        return (
                            tag.props.visible ?
                                <span
                                    key={index}
                                >{tag.type} - {tag.props.caption}</span>
                            : null
                        )
                    case 'button':
                        return (
                            tag.props.visible ?
                                <button
                                    key={index}
                                    style={{...tag.props}}
                                >{tag.type} - {tag.props.caption}</button>
                            : null
                        )
                    default: return null
                }
            })

        return (
            <div className={classes.Layout}>
                <div className={classes.TopFields}>
                    <div>
                        <label htmlFor="path">Путь</label>
                        <input
                            id="path"
                            type="text"
                            ref={ref => this.inputPath = ref}
                        />
                    </div>
                    <div>
                        <label htmlFor="newValue">Новое значение</label>
                        <input
                            id="newValue"
                            type="text"
                            ref={ref => this.inputNewValue = ref}
                        />
                    </div>
                    <Button
                        onClick={this.resultClick}
                    />
                </div>
                <div className={classes.Content}>
                    { returnContent(contentTags) }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        content: state.content
    }
}
function mapDispatchToProps(dispatch){
    return {
        result: () => dispatch()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)