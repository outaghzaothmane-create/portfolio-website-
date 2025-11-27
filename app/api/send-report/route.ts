import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, results } = await req.json();

    if (!email || !results) {
      return NextResponse.json({ error: "Email and results are required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "OthmaneSEO <onboarding@resend.dev>",
      to: [email],
      subject: `Your Site Audit Report for ${results.url}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
            .header { background-color: #1a73e8; color: white; padding: 32px 24px; text-align: center; }
            .content { padding: 32px 24px; }
            .metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
            .metric-card { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 16px; text-align: center; }
            .metric-label { font-size: 12px; text-transform: uppercase; color: #5f6368; letter-spacing: 0.5px; margin-bottom: 4px; font-weight: 600; }
            .metric-value { font-size: 24px; font-weight: bold; color: #202124; }
            .section-title { font-size: 18px; font-weight: 600; color: #202124; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #e9ecef; }
            .item { margin-bottom: 24px; }
            .item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
            .item-label { font-weight: 600; color: #3c4043; }
            .badge { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
            .badge-good { background-color: #e6f4ea; color: #137333; }
            .badge-warning { background-color: #fef7e0; color: #b06000; }
            .badge-error { background-color: #fce8e6; color: #c5221f; }
            .code-block { background: #f1f3f4; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 13px; color: #4a4a4a; word-break: break-all; }
            .footer { background-color: #f8f9fa; padding: 24px; text-align: center; font-size: 12px; color: #5f6368; border-top: 1px solid #e9ecef; }
            .cta-button { display: inline-block; background-color: #1a73e8; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; margin-top: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin:0; font-size: 24px; font-weight: 700;">Site Audit Report</h1>
              <p style="margin:8px 0 0; opacity: 0.9; font-size: 16px;">${results.url}</p>
            </div>
            
            <div class="content">
              <!-- Metrics (Using Table for Email Compatibility) -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td width="48%">
                    <div class="metric-card">
                      <div class="metric-label">Response Time</div>
                      <div class="metric-value">${results.ttfb}ms</div>
                    </div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%">
                    <div class="metric-card">
                      <div class="metric-label">SSL Status</div>
                      <div class="metric-value" style="color: ${results.isHttps ? '#137333' : '#c5221f'}">
                        ${results.isHttps ? 'Secure' : 'Insecure'}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <div class="section-title">On-Page SEO Analysis</div>

              <div class="item">
                <div style="margin-bottom: 8px;">
                  <span class="item-label">Title Tag</span>
                  <span class="badge ${results.title.status === 'good' ? 'badge-good' : 'badge-warning'}" style="float: right;">
                    ${results.title.status.toUpperCase()}
                  </span>
                </div>
                <div class="code-block">
                  ${results.title.value || 'Missing'}
                </div>
              </div>

              <div class="item">
                <div style="margin-bottom: 8px;">
                  <span class="item-label">Meta Description</span>
                  <span class="badge ${results.description.status === 'good' ? 'badge-good' : 'badge-warning'}" style="float: right;">
                    ${results.description.status.toUpperCase()}
                  </span>
                </div>
                <div class="code-block">
                  ${results.description.value || 'Missing'}
                </div>
              </div>

              <div class="item">
                <div style="margin-bottom: 8px;">
                  <span class="item-label">H1 Tag</span>
                  <span class="badge ${results.h1.status === 'good' ? 'badge-good' : 'badge-error'}" style="float: right;">
                    ${results.h1.status.toUpperCase()}
                  </span>
                </div>
                <div class="code-block">
                  ${results.h1.value || 'Missing'}
                </div>
              </div>

              <div style="text-align: center; margin-top: 32px;">
                <p style="margin-bottom: 16px;">Want to fix these issues and improve your ranking?</p>
                <a href="mailto:outaghza.othmane@gmail.com" class="cta-button">Book a Full Strategy Call</a>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0;">Generated by <strong>Othmane.SEO</strong> Audit Tool</p>
              <p style="margin: 8px 0 0;">Automated Technical Analysis</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
