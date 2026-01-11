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
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    // Group issues by category
    const criticalIssues = results.details.issues.filter((i: any) => i.category === 'critical');
    const warnings = results.details.issues.filter((i: any) => i.category === 'warning');
    const goodToHave = results.details.issues.filter((i: any) => i.category === 'good-to-have');

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
            .greeting { padding: 24px; color: #d4d4d4; font-size: 14px; line-height: 1.8; border-bottom: 1px solid #333333; }
            .content { padding: 40px 24px; }
            .card { background: #1a1a1a; border: 1px solid #333333; border-radius: 12px; padding: 20px; text-align: center; }
            .label { font-size: 11px; text-transform: uppercase; color: #a3a3a3; letter-spacing: 1px; margin-bottom: 8px; font-weight: 700; }
            .value { font-size: 24px; font-weight: 800; color: #ffffff; }
            .section-title { font-size: 18px; font-weight: 700; color: #ffffff; margin: 40px 0 20px 0; padding-bottom: 16px; border-bottom: 1px solid #333333; display: flex; align-items: center; }
            
            /* Issue Cards with Two-Column Layout */
            .issue-card { background: #1a1a1a; border: 1px solid #333333; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
            .issue-card.critical { border-left: 4px solid #ef4444; background: #1a0a0a; }
            .issue-card.warning { border-left: 4px solid #eab308; background: #1a1a0a; }
            .issue-card.good-to-have { border-left: 4px solid #3b82f6; background: #0a0a1a; }
            
            .issue-header { font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }
            .issue-advice { font-size: 13px; color: #a3a3a3; background: #0a0a0a; padding: 12px; border-radius: 6px; border: 1px solid #1a1a1a; font-style: italic; }
            .issue-advice::before { content: '💡 How to Fix: '; font-weight: 700; color: #22c55e; font-style: normal; }
            
            .list-item { display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #333333; font-size: 14px; color: #d4d4d4; }
            .list-item strong { color: #ffffff; font-weight: 600; }
            .cta-button { display: block; width: 100%; box-sizing: border-box; background-color: #22c55e; color: #000000; text-decoration: none; padding: 18px 0; border-radius: 8px; font-weight: 800; text-align: center; margin-top: 40px; font-size: 16px; letter-spacing: 0.5px; }
            .badge { padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
            .badge-good { background: #14532d; color: #4ade80; border: 1px solid #166534; }
            .badge-warn { background: #713f12; color: #facc15; border: 1px solid #854d0e; }
            .badge-error { background: #450a0a; color: #fca5a5; border: 1px solid #7f1d1d; }
            .footer { background-color: #000000; padding: 40px 24px; text-align: center; font-size: 12px; color: #525252; border-top: 1px solid #333333; }
            .summary-box { background: #1a1a1a; border: 1px solid #333333; padding: 20px; border-radius: 8px; margin-bottom: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="score-ring">
                ${results.score}
              </div>
              <h1 style="margin:0; font-size: 24px; font-weight: 700; color: #fff;">SEO Audit Complete</h1>
              <p style="margin:8px 0 0; color: #737373; font-size: 14px;">${results.url}</p>
            </div>
            
            <div class="greeting">
              <p style="margin: 0 0 16px 0;"><strong>Hi there,</strong></p>
              <p style="margin: 0;">I've completed a comprehensive technical analysis of your website. Your site scored <strong>${results.score}/100</strong>, and I've identified ${results.details.issues.length} optimization ${results.details.issues.length === 1 ? 'opportunity' : 'opportunities'} to help you rank higher in search results.</p>
            </div>
            
            <div class="content">
              <!-- Summary Box -->
              <div class="summary-box">
                <div style="font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">📊 Performance Snapshot</div>
                <div style="color: #a3a3a3; font-size: 13px; line-height: 1.6;">
                  Your site loads in <strong style="color: #ffffff;">${results.details.performance.ttfb}ms</strong> with 
                  <strong style="color: #ffffff;">${results.details.performance.wordCount}</strong> words of content. 
                  ${results.details.social.hasSocialTags ? '✓ Social media tags are configured.' : '✗ Social media tags need attention.'} 
                  ${results.details.schema.hasSchema ? '✓ Structured data detected.' : '✗ No structured data found.'}
                </div>
              </div>

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
                <tr><td height="12"></td></tr>
                <tr>
                  <td width="48%">
                    <div class="card">
                      <div class="label">Social Tags</div>
                      <div class="value" style="color: ${results.details.social.hasSocialTags ? '#4ade80' : '#ef4444'}">
                        ${results.details.social.hasSocialTags ? '✓' : '✗'}
                      </div>
                    </div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%">
                    <div class="card">
                      <div class="label">Schema</div>
                      <div class="value" style="color: ${results.details.schema.hasSchema ? '#4ade80' : '#eab308'}">
                        ${results.details.schema.hasSchema ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Critical Issues -->
              ${criticalIssues.length > 0 ? `
                <div class="section-title">🔴 Critical Issues (${criticalIssues.length})</div>
                <p style="color: #a3a3a3; margin-top: -10px; font-size: 13px;">These issues directly impact your search rankings and must be fixed immediately.</p>
                ${criticalIssues.map((issue: any) => `
                  <div class="issue-card critical">
                    <div class="issue-header">${issue.issue}</div>
                    <div class="issue-advice">${issue.advice}</div>
                  </div>
                `).join('')}
              ` : ''}

              <!-- Warnings -->
              ${warnings.length > 0 ? `
                <div class="section-title">⚠️  Warnings (${warnings.length})</div>
                <p style="color: #a3a3a3; margin-top: -10px; font-size: 13px;">Important optimizations that will improve your SEO performance.</p>
                ${warnings.map((issue: any) => `
                  <div class="issue-card warning">
                    <div class="issue-header">${issue.issue}</div>
                    <div class="issue-advice">${issue.advice}</div>
                  </div>
                `).join('')}
              ` : ''}

              <!-- Good to Have -->
              ${goodToHave.length > 0 ? `
                <div class="section-title">💡 Good to Have (${goodToHave.length})</div>
                <p style="color: #a3a3a3; margin-top: -10px; font-size: 13px;">Additional enhancements to maximize your SEO potential.</p>
                ${goodToHave.map((issue: any) => `
                  <div class="issue-card good-to-have">
                    <div class="issue-header">${issue.issue}</div>
                    <div class="issue-advice">${issue.advice}</div>
                  </div>
                `).join('')}
              ` : ''}

              ${results.details.issues.length === 0 ? `
                <div style="padding: 16px; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); color: #4ade80; border-radius: 8px; text-align: center; margin-bottom: 24px;">
                  ✨ Excellent! No critical issues found. Your site is well-optimized!
                </div>
              ` : ''}

              <!-- Technical Deep Dive -->
              <div class="section-title">🔍 Technical Deep Dive</div>
              
              <div class="list-item">
                <span>Title Tag</span>
                <span class="badge ${results.details.meta.title ? 'badge-good' : 'badge-error'}">
                  ${results.details.meta.title ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <div class="list-item">
                <span>Meta Description</span>
                <span class="badge ${results.details.meta.description ? 'badge-good' : 'badge-error'}">
                  ${results.details.meta.description ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <div class="list-item">
                <span>H1 Structure</span>
                <span class="badge ${results.details.headings.h1Count === 1 ? 'badge-good' : 'badge-error'}">
                  ${results.details.headings.h1Count} Found
                </span>
              </div>
              <div class="list-item">
                <span>Images w/ Alt</span>
                <strong>${results.details.images.total - results.details.images.missingAlt} / ${results.details.images.total}</strong>
              </div>
              <div class="list-item">
                <span>Internal Links</span>
                <strong style="color: #22c55e;">${results.details.performance.internalLinks}</strong>
              </div>
              <div class="list-item" style="border-bottom: none;">
                <span>Tech Stack</span>
                <strong style="color: #22c55e;">${results.details.tech.generator}</strong>
              </div>

              <!-- Next Steps -->
              <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border: 1px solid #333333; padding: 24px; border-radius: 8px; margin-top: 32px;">
                <div style="font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">🚀 Next Steps</div>
                <p style="color: #a3a3a3; margin: 0 0 16px 0; font-size: 13px;">
                  ${results.score >= 90
          ? "Your site is performing well! Let's maintain this momentum with ongoing optimization."
          : results.score >= 70
            ? "Your site has a solid foundation. Let's work together to achieve a perfect 100 score."
            : "I can help you fix these issues and dramatically improve your search rankings."}
                </p>
                <a href="mailto:outaghza.othmane@gmail.com" class="cta-button">
                  Book Free Strategy Call
                </a>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0;"><strong>Othmane Outaghza</strong> · SEO Consultant</p>
              <p style="margin: 8px 0 0; opacity: 0.5;">Automated Technical Analysis Powered by OthmaneSEO</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
