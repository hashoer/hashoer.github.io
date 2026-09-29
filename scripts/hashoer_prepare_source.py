# -*- coding: utf-8 -*-
"""hashoer 源页准备：资源路径绝对化 + products.js 缓存版本号升级。
（初始化语言/切换器跳目录/hreflang 由 hashoer_build_i18n.js 统一处理）"""
import os, re

SITE = os.path.dirname(os.path.abspath(__file__))  # scripts/ -> 上级是 hashoer-en
SITE = os.path.dirname(SITE)

def sub_file(fname, pairs, count_only=False):
    p = os.path.join(SITE, fname)
    with open(p, 'r', encoding='utf-8') as f:
        t = f.read()
    total = 0
    for old, new, expect in pairs:
        n = t.count(old)
        t = t.replace(old, new)
        total += n
        flag = 'OK ' if (expect is None or n == expect) else '!! '
        print(f"  {flag}{fname}: '{old[:40]}' x{n} (expect {expect})")
    if not count_only and total:
        with open(p, 'w', encoding='utf-8', newline='') as f:
            f.write(t)
    return total

print('== index.html ==')
sub_file('index.html', [
    ('src="images/', 'src="/images/', 30),
    ("openModal('videos/", "openModal('/videos/", 9),
    ('products.js?v=20260921a', 'products.js?v=20260929a', 1),
])

print('== products.html ==')
sub_file('products.html', [
    ('src="images/', 'src="/images/', 1),
    ('products.js?v=20260921a', 'products.js?v=20260929a', 1),
])

print('== privacy.html ==')
sub_file('privacy.html', [
    ('src="images/', 'src="/images/', 1),
])

print('== products.js ==')
sub_file('products.js', [
    ("img: 'images/", "img: '/images/", 18),
    ('\'<img src="images/\' + cfg.img', '\'<img src="/images/\' + cfg.img', 1),
])

print('done')
