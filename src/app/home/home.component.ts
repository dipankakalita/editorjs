import { Component, OnInit } from '@angular/core';
import EditorJS from "@editorjs/editorjs";

import Header from '@editorjs/Header';
import List from '@editorjs/list';
import LinkTool  from '@editorjs/link';
// import SimpleImage  from '@editorjs/simple-image';
import AttachesTool from '@editorjs/attaches';
import Paragraph from '@editorjs/paragraph';
import SimpleImage from 'simple-image-editorjs';
import InlineImage from 'editorjs-inline-image';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import DragDrop from 'editorjs-drag-drop';
import edjsParser  from 'editorjs-parser';
import {config} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  constructor() { }
  customParsers:any;
   
  editor: any;
  // const ImageTool = window.ImageTool;
 ngOnInit(): void {
  // const ImageTool = window.ImageTool;
    this.editor = new EditorJS( {
      holderId: 'editor-js',
      autofocus: true,
      tools: {
        header: {
          class: Header,
          tunes: ['anyTuneName'],
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        attaches: {
          class: AttachesTool,
          config: {
            endpoint: 'http://localhost:8008/uploadFile'
          }
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          tunes: ['anyTuneName'],
        },
        anyTuneName: {
          class:AlignmentTuneTool,
          config:{
            default: "left",
            blocks: {
              header: 'center',
              list: 'left'
            }
          },
        },
        image: {
          class: SimpleImage,
          inlineToolbar: true,
          config: {
            embed: {
              display: true,
            },
            unsplash: {
              appName: 'your_app_name',
              clientId: 'your_client_id'
            }
          }
        }
      },
      onReady: () => {
        new DragDrop(this.editor);
      },
    });
  }
  // parser = new edjsParser(undefined, this.customParsers);
  onSave() {

    const parser = new edjsParser(undefined, this.customParsers);
    // const markup = parser.parse(output);

    this.editor
      .save()
      .then((outputData) => {
        console.log('HTML data: ',  parser.parse(outputData));
        
      }).catch((error) => {
        console.log('Saving failed: ', error);
      });
  }

}
