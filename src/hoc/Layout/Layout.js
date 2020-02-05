import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '../../Components/UI/Button/Button'
import classes from './Layout.module.css'

class Layout extends Component {
    render() {
        // let contentTags = this.props.content

        const returnContent = obj => obj.map((tag, index) => {
            try {
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
                    default:
                        return null
                }
            }
            catch(error) {
                alert('render error: ' + error)
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
                        onClick={() => this.props.resultContent(this.inputPath.value, this.inputNewValue.value)}
                    />
                </div>
                <div className={classes.Content}>
                    { returnContent(this.props.content) }
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
        resultContent: (inputPath, inputNewVal) => dispatch({type: true, valPath: inputPath, valNew: inputNewVal})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)