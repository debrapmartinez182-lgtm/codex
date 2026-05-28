import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.qq.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465");
const SMTP_USER = process.env.SMTP_USER || "94418619@qq.com";
const SMTP_PASS = process.env.SMTP_PASS || "";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "94418619@qq.com";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendNewOrderEmail(order: {
  id: string;
  docName: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  fee: number;
  createdAt: string;
}) {
  // Skip if no SMTP password configured
  if (!SMTP_PASS) {
    console.log("[Email] SMTP_PASS not configured, skipping email notification");
    return;
  }

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1d4ed8, #3b82f6); padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">🔔 新订单提醒</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">中俄文件认证服务平台</p>
      </div>
      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 100px;">订单编号</td>
            <td style="padding: 10px 0; font-weight: 600; color: #1e293b; font-size: 14px;">${order.id}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px;">文件类型</td>
            <td style="padding: 10px 0; font-weight: 600; color: #1e293b; font-size: 14px;">${order.docName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px;">客户姓名</td>
            <td style="padding: 10px 0; font-weight: 600; color: #1e293b; font-size: 14px;">${order.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px;">手机号</td>
            <td style="padding: 10px 0; font-weight: 600; color: #1e293b; font-size: 14px;">${order.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px;">邮箱</td>
            <td style="padding: 10px 0; font-weight: 600; color: #1e293b; font-size: 14px;">${order.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px;">收件地址</td>
            <td style="padding: 10px 0; font-weight: 600; color: #1e293b; font-size: 14px;">${order.address}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px;">认证费用</td>
            <td style="padding: 10px 0; font-weight: 700; color: #1d4ed8; font-size: 18px;">¥${order.fee.toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px;">提交时间</td>
            <td style="padding: 10px 0; font-weight: 600; color: #1e293b; font-size: 14px;">${new Date(order.createdAt).toLocaleString("zh-CN")}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
          <a href="https://eztd.cn/admin" style="display: inline-block; padding: 10px 24px; background: #1d4ed8; color: white; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">进入后台查看</a>
        </div>
      </div>
    </div>
  `;

  try {
    const transport = getTransporter();
    await transport.sendMail({
      from: `"中俄文件认证" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      subject: `【新订单】${order.docName} - ${order.name} - ¥${order.fee}`,
      html,
    });
    console.log(`[Email] Notification sent to ${NOTIFY_EMAIL} for order ${order.id}`);
  } catch (error) {
    console.error("[Email] Failed to send notification:", error);
  }
}
