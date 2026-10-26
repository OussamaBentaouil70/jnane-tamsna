<?php
/** @var string $reference */
/** @var string $firstName */
/** @var string $eventType */
/** @var string $eventDate */
/** @var string $guestCount */
/** @var string $budget */
/** @var string $message */
/** @var string $whatsappLink */
/** @var string $siteUrl */
/** @var string $year */
/** @var string $brandName */

$rows = [
    'Reference' => $reference,
    'Event' => $eventType,
    'Date' => $eventDate,
    'Guests' => $guestCount,
    'Budget' => $budget,
];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Thank you</title>
</head>
<body style="margin:0;padding:0;background-color:#eeeee8;font-family:Arial,Helvetica,sans-serif;color:#333333;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eeeee8;">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border:1px solid #d9d9d2;overflow:hidden;">

          <tr>
            <td style="background-color:#333333;padding:28px 32px;text-align:center;border-bottom:4px solid #d1d4bc;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:21px;letter-spacing:0.16em;color:#ffffff;text-transform:uppercase;">
                <?= e($brandName) ?>
              </div>
              <div style="margin-top:7px;font-size:10px;letter-spacing:0.26em;color:#d1d4bc;text-transform:uppercase;">
                Weddings &amp; Events · Marrakech
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:34px 40px 8px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:bold;letter-spacing:0.22em;text-transform:uppercase;color:#72774d;">
                Thank you
              </p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:27px;line-height:1.3;font-weight:normal;color:#1b1b1a;">
                Thank you, <?= e($firstName) ?>.
              </h1>
              <p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#555555;">
                We have received your inquiry and our events team will reply within
                <strong style="color:#1b1b1a;">24–48 hours</strong>.
              </p>
              <p style="margin:10px 0 0;font-size:13px;line-height:1.7;color:#70706e;">
                Your reference is <strong style="color:#333333;"><?= e($reference) ?></strong>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e6e6e0;">
                <?php foreach ($rows as $label => $value): ?>
                  <tr>
                    <td style="padding:10px 14px;font-size:12px;color:#70706e;border-bottom:1px solid #eeeeea;width:34%;"><?= e($label) ?></td>
                    <td style="padding:10px 14px;font-size:13px;font-weight:bold;color:#333333;border-bottom:1px solid #eeeeea;"><?= e($value) ?></td>
                  </tr>
                <?php endforeach; ?>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f7f2;border-left:3px solid #d1d4bc;">
                <tr>
                  <td style="padding:16px 18px;">
                    <span style="display:block;margin-bottom:6px;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#70706e;">
                      Your message
                    </span>
                    <span style="font-size:13px;line-height:1.7;color:#444444;">
                      <?= nl2br(e($message)) ?>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <?php if ($whatsappLink !== ''): ?>
            <tr>
              <td align="center" style="padding:28px 40px 8px;">
                <a href="<?= e($whatsappLink) ?>" style="display:inline-block;background-color:#333333;color:#ffffff;text-decoration:none;padding:13px 26px;font-size:12px;font-weight:bold;letter-spacing:0.1em;text-transform:uppercase;">
                  Chat on WhatsApp
                </a>
              </td>
            </tr>
          <?php endif; ?>

          <tr>
            <td style="padding:24px 40px 28px;">
              <div style="border-top:1px solid #dddddd;padding-top:18px;text-align:center;">
                <?php if ($siteUrl !== ''): ?>
                  <p style="margin:0 0 8px;font-size:12px;">
                    <a href="<?= e($siteUrl) ?>" style="color:#333333;text-decoration:underline;">
                      <?= e($siteUrl) ?>
                    </a>
                  </p>
                <?php endif; ?>
                <p style="margin:0;font-size:11px;color:#999999;">
                  © <?= e($year) ?> <?= e($brandName) ?>
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
