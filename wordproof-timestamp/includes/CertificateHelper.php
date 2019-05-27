<?php

namespace WordProof\includes;

class CertificateHelper {
    private static $default_template = "<p><a class='wordproof-certificate-helper' data-post-id='POST_ID' href='CERTIFICATE_URL'>CERTIFICATE_TEXT</a></p>";
    private static $default_text = "View this content's WordProof Timestamp certificate";
    private static $default_url = '#wordproof';

    static public function getCertificateTemplate() {
        $template = self::$default_template;
        return $template;
    }

    static public function getCertificateText() {
        $text = get_option('wordproof_certificate_text', null) ?: self::$default_text;
        return $text;
    }

    static public function getCertificateUrl() {
        $url = self::$default_url;
        return $url;
    }

  /**
   * Generate certificate html link
   * @param $postId
   * @return mixed|string
   */
    static public function getCertificateHtml($postId) {
        $html = self::getCertificateTemplate();
        $text = self::getCertificateText();
        $url = self::getCertificateUrl();
        $html = str_replace('CERTIFICATE_URL', $url, $html);
        $html = str_replace('CERTIFICATE_TEXT', $text, $html);
        $html = str_replace('POST_ID', $postId, $html);
        return $html;
    }
}
