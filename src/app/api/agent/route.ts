import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
 
const notion = new Client({ auth: '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' });
 
export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  console.log(process.env.NOTION_DATABASE_ID);
 
  try {
    const response = await notion.pages.create({
      parent: { database_id: '18ad989c294980b3be85f5796c1a89ca'},
      properties: {
        Title: {
            title: [
                {
                    text: {
                        content: "New Data Entry 003"
                    }
                }
            ]
        },
        Content: {
            rich_text: [
                {
                    text: {
                        content: "This is a sample description. 003"
                    }
                }
            ]
        },
        Status: {  
            rich_text: [
                {
                    text: {
                        content: "Published"
                    }
                }
            ]
        }
    }
     
    });
 
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}