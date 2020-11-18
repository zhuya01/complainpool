import React, {useContext} from 'react';

import UploadPackage from '../mutations/UploadPackage'

import {SessionContext} from 'funweb-lib'

import {Editor} from '@tinymce/tinymce-react';



export default function App(props) {

    const onChange=props.onChange//onChange事件
    let content=props.instruction_content//内容
    const handleEditorChange = (content, editor) => {//输入变化
        onChange(content)
    }
    const session = useContext(SessionContext);//session
    if(content)
        content=content.replace('<img src="../storage/','<img src="/storage/')
    else
        content=''
    return (
        <div>
            <div>
                <Editor
                    initialValue={content}
                    init={{
                        height: 300,
                        min_height:300,
                        menubar: '',
                        language: 'zh_CN',
                        plugins: 'importcss  searchreplace directionality   visualblocks visualchars charmap hr  advlist lists wordcount  imagetools charmap',
                        toolbar: 'fontselect fontsizeselect formatselect | bold italic underline strikethrough | forecolor backcolor |alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist ',
                        branding: false,
                        font_formats: '仿宋=仿宋_GBK;方正仿宋=方正仿宋;方正仿宋_GBK=方正仿宋_GBK;方正小标宋_GBK=方正小标宋_GBK;方正黑体_GBK=方正黑体_GBK;微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;楷体=楷体;宋体=simsun,serif;黑体=黑体,SimHei,sans-serif;',
                        fontsize_formats:'初号=56px 小号=36px 一号=34px 小一=32px 二号=26px 小二=24px 三号=22px 小三=20px 四号=18px 小四=16px 五号=14px 小五=12px',
                        // content_style:"@font-face {\n" +
                        //     "    font-family: '方正仿宋_GBK';\n" +
                        //     "    src: url(\"/static/fzfs_GBKFZFSK.TTF\");\n" +
                        //     "}\n"
                    }}
                    onEditorChange={handleEditorChange}
                />
            </div>
        </div>
    );
}

