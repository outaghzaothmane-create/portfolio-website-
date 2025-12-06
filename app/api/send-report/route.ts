import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { email, results } = await req.json();

    if (!email || !results) {
      return NextResponse.json({ error: "Email and results are required" }, { status: 400 });
    }

    // Initialize Resend client at request time, not module scope
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "OthmaneSEO <onboarding@resend.dev>",
      to: [email],
      subject: `SEO Health Score: ${results.score}/100 for ${results.url}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #ffffff; margin: 0; padding: 0; background-color: #000000; }
            .container { max-width: 600px; margin: 0 auto; background-color: #000000; border: 1px solid #333333; }
            .header { background-color: #000000; padding: 40px 24px; text-align: center; border-bottom: 1px solid #333333; }
            .score-ring { 
              width: 100px; height: 100px; border-radius: 50%; 
              border: 4px solid ${results.score >= 70 ? '#22c55e' : (results.score >= 50 ? '#eab308' : '#ef4444')}; 
              background: #000000; color: #ffffff; 
              display: flex; align-items: center; justify-content: center; 
              font-size: 36px; font-weight: 800; margin: 0 auto 20px; 
              box-shadow: 0 0 20px ${results.score >= 70 ? 'rgba(34,197,94,0.4)' : 'rgba(0,0,0,0)'};
            }
            .content { padding: 40px 24px; }
            /* Cards: Lighter grey for better contrast against black body */
            .card { background: #1a1a1a; border: 1px solid #333333; border-radius: 12px; padding: 20px; text-align: center; }
            .label { font-size: 11px; text-transform: uppercase; color: #a3a3a3; letter-spacing: 1px; margin-bottom: 8px; font-weight: 700; }
            .value { font-size: 24px; font-weight: 800; color: #ffffff; }
            .section-title { font-size: 18px; font-weight: 700; color: #ffffff; margin: 40px 0 20px 0; padding-bottom: 16px; border-bottom: 1px solid #333333; display: flex; align-items: center; }
            /* SOLID COLORS for Issues - No transparency to avoid rendering bugs */
            .issue-item { padding: 16px; border-radius: 8px; background: #450a0a; border: 1px solid #7f1d1d; color: #fecaca; margin-bottom: 12px; font-size: 14px; font-weight: 500; }
            .list-item { display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #333333; font-size: 14px; color: #d4d4d4; }
            .list-item strong { color: #ffffff; font-weight: 600; }
            .cta-button { display: block; width: 100%; box-sizing: border-box; background-color: #22c55e; color: #000000; text-decoration: none; padding: 18px 0; border-radius: 8px; font-weight: 800; text-align: center; margin-top: 40px; font-size: 16px; letter-spacing: 0.5px; }
            /* Solid Badges */
            .badge { padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
            .badge-good { background: #14532d; color: #4ade80; border: 1px solid #166534; }
            .badge-warn { background: #713f12; color: #facc15; border: 1px solid #854d0e; }
            .footer { background-color: #000000; padding: 40px 24px; text-align: center; font-size: 12px; color: #525252; border-top: 1px solid #333333; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="score-ring">
                ${results.score}
              </div>
              <h1 style="margin:0; font-size: 24px; font-weight: 700; color: #fff;">Audit Complete</h1>
              <p style="margin:8px 0 0; color: #737373; font-size: 14px;">${results.url}</p>
            </div>
            
            <div class="content">
              <!-- Grid Layout for email using Tables -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td width="48%">
                    <div class="card">
                      <div class="label">Load Time</div>
                      <div class="value">${results.details.performance.ttfb}ms</div>
                    </div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%">
                    <div class="card">
                      <div class="label">Words</div>
                      <div class="value">${results.details.performance.wordCount}</div>
                    </div>
                  </td>
                </tr>
                <tr><td height="12"></td></tr>
                <tr>
                  <td width="48%">
                    <div class="card">
                      <div class="label">Mobile</div>
                      <div class="value" style="color: ${results.details.meta.viewport ? '#4ade80' : '#ef4444'}">
                        ${results.details.meta.viewport ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%">
                    <div class="card">
                      <div class="label">HTTPS</div>
                      <div class="value" style="color: ${results.isHttps ? '#4ade80' : '#ef4444'}">
                        ${results.isHttps ? 'Secure' : 'Unsafe'}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Issues -->
              ${results.details.issues.length > 0 ? `
                <div class="section-title">Critical Issues (${results.details.issues.length})</div>
                ${results.details.issues.map((issue: string) => `
                  <div class="issue-item">
                    ⚠️ ${issue}
                  </div>
                `).join('')}
              ` : `
                <div style="padding: 16px; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); color: #4ade80; border-radius: 8px; text-align: center; margin-bottom: 24px;">
                  ✨ No critical issues found!
                </div>
              `}

              <!-- Deep Dive -->
              <div class="section-title">Technical Deep Dive</div>
              
              <div class="list-item">
                <span>Title Tag</span>
                <span class="badge ${results.details.meta.title ? 'badge-good' : 'badge-warn'}">
                  ${results.details.meta.title ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <div class="list-item">
                <span>Meta Description</span>
                <span class="badge ${results.details.meta.description ? 'badge-good' : 'badge-warn'}">
                  ${results.details.meta.description ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <div class="list-item">
                <span>H1 Structure</span>
                <span class="badge ${results.details.headings.h1Count === 1 ? 'badge-good' : 'badge-warn'}">
                  ${results.details.headings.h1Count} Found
                </span>
              </div>
              <div class="list-item">
                <span>Images w/ Alt</span>
                <strong>${results.details.images.total - results.details.images.missingAlt} / ${results.details.images.total}</strong>
              </div>
              <div class="list-item" style="border-bottom: none;">
                <span>Tech Stack</span>
                <strong style="color: #22c55e;">${results.details.tech.generator}</strong>
              </div>

              <div style="text-align: center; margin-top: 40px;">
                <p style="margin-bottom: 16px; color: #a3a3a3;">Ready to achieve a perfect 100 score?</p>
                <a href="mailto:outaghza.othmane@gmail.com" class="cta-button">
                  Book Strategy Call
                </a>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0;">Sent by <strong>Othmane.SEO</strong> Audit Bot</p>
              <p style="margin: 8px 0 0; opacity: 0.5;">Automated Technical Analysis</p>
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
