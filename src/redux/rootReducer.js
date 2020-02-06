const initialState = {
    content : [
        {
            type: 'panel',
            props: {
                width: 500,
                minHeight: 150,
                background: 'rgba(0,0,0,.2)',
                visible: true
            },
            content : [
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
                },
                {
                    type: 'panel',
                    props: {
                        miWidth: 50,
                        minHeight: 50,
                        margin: '0 0 10px 100px',
                        visible: true
                    },
                }
            ]
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
};

export default function rootReducer(state = initialState, action) {

    let inputPath = action.valPath || null;
    let inputNewValue = action.valNew || null;

    let content = [...state.content];

    if(inputPath !== null) {

        let parts = inputPath.split(".");
        let current = {...state}
        let ArLength = parts.length;

        try {
            for (let i = 0; i < ArLength - 1; i++) {

                if (parts[i].match(/content\[\d+\]/)) {
                    const contentIndexArr = parts[i].match(/\d+/);
                    const contentIndex = Number(contentIndexArr[0]);

                    current = current['content'][contentIndex]
                }
                else current = current[parts[i]]

                if (!current) break
            }

            if (!parts[ArLength - 1].match(/content/)) {
                if (parts[ArLength - 1] === 'visible') {
                    if (inputNewValue === 'true') current[parts[ArLength - 1]] = true;
                    if (inputNewValue === 'false' || inputNewValue === null) current[parts[ArLength - 1]] = false
                }else if (!parts[ArLength - 1].match(/width|Height|Width|height/)) current[parts[ArLength - 1]] = inputNewValue;
                else current[parts[ArLength - 1]] = Number(inputNewValue)
            }
            else {
                const indexContentArr = parts[ArLength - 1].match(/\d+/)
                if(ArLength > 1) {
                    if(current.content) current.content[indexContentArr[0]] = eval('(' + inputNewValue + ')')
                    else {
                        alert('Создайте panel с массивом content (можно пустым)!')
                    }
                }
                else content[indexContentArr[0]] = eval('(' + inputNewValue + ')')
            }
        } catch (error) {
            alert('rootReducer error: ' + error)
        }
    }

    return {content: [...content]}
}