# -*- coding: utf-8 -*-
"""hashoer 建站资料位置表 v2（资料已搬家至 D 盘 06_独立站）"""
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment

wb = openpyxl.Workbook()
ws = wb.active
ws.title = '建站资料位置'

header_fill = PatternFill('solid', fgColor='1F4E79')

NEW = r'D:\外贸行资料库\06_独立站\建站搭子'

rows = [
    ['分类', '内容', '位置（本机路径 / 线上地址）', '说明'],
    # 本机资料
    ['本机资料', '网站源文件（权威源）', NEW + r'\hashoer-en', '唯一修改入口：index.html（主页）、products.html（产品页）、privacy.html（隐私页）、products.js（设备目录+多语字典）、images/、videos/。所有修改在这里做，改完才会上线'],
    ['本机资料', '多语言生成器脚本', NEW + r'\hashoer-en\scripts\hashoer_build_i18n.js', 'jsdom 生成 15 个语言子目录页（48 个文件）。改完源页必须重跑，否则子目录页不更新'],
    ['本机资料', '路径准备脚本', NEW + r'\hashoer-en\scripts\hashoer_prepare_source.py', '图片/视频路径绝对化 + products.js 缓存版本号升级'],
    ['本机资料', 'sitemap 生成脚本', NEW + r'\hashoer-en\scripts\hashoer_build_sitemap.js', '生成 48 URL 多语言 sitemap.xml（含 hreflang）'],
    ['本机资料', '语言功能测试脚本', NEW + r'\hashoer-en\scripts\hashoer_test_init_lang.js', '无头浏览器实测各语言页加载后语言是否保持'],
    ['本机资料', 'URL 清单 Excel', NEW + r'\hashoer-en\hashoer_多语言子目录URL清单.xlsx', '16 语言 × 3 页 = 48 URL + SEO 提交说明（另一份副本在 06_独立站 根目录）'],
    ['本机资料', '改造前 v1 备份快照', NEW + r'\hashoer-en-v1-live-20260929', '2026-09-29 多语言改造前的完整备份（另可 git checkout v1-live-20260929）'],
    ['本机资料', '换图换视频工具', NEW + r'\hashoer-en\replace\（配合 一键换图换视频.bat）', '新图片/视频改名后丢进 replace/ 双击 bat 即可完成备份→替换→部署'],
    ['本机资料', 'druomu 站源文件（第二站点）', NEW + r'\druomu\site', 'druomu.com 源文件，与 hashoer 完全隔离，互不混改'],
    # 线上架构
    ['线上架构', '正式网站', 'https://hashoer.com', '英文为默认语言（根目录）；其他语言 /es/ /fr/ /ar/ 等 15 个子目录'],
    ['线上架构', 'Cloudflare Pages 项目', 'hashoer-github-io.pages.dev（CF 控制台管理）', '托管服务，自定义域 hashoer.com 已绑定，自动 HTTPS'],
    ['线上架构', '源码仓库（GitHub）', 'https://github.com/hashoer/hashoer.github.io （main 分支）', 'push 到 main 自动触发 Cloudflare Pages 重新部署（1-2 分钟生效）'],
    ['线上架构', '站点地图（SEO）', 'https://hashoer.com/sitemap.xml', '48 个多语言 URL + hreflang，提交到 Google Search Console 即可'],
    # 改站流程
    ['改站流程', '标准改动流程', '改源文件 → 跑 hashoer_prepare_source.py → 跑 hashoer_build_i18n.js → 本地验证 → git push', '推送后 Cloudflare Pages 自动部署；浏览器需 Ctrl+F5 强刷才能看到新内容'],
    ['改站流程', '⚠️ 三条铁律', '① 改 products.js 必须升缓存版本号（当前 20260929a）② 两站隔离：hashoer 与 druomu（建站搭子/druomu/）互不混改 ③ 大改动前先备份（git 标签+快照）', '违反任何一条都会出线上事故'],
    ['改站流程', '📌 资料位置', '全部建站资料已于 2026-10-08 搬至 D:\\外贸行资料库\\06_独立站\\建站搭子\\（C 盘原位置已清空）', '线上网站不受影响（Cloudflare Pages 从 GitHub 拉代码，与本地路径无关）'],
]

for r in rows:
    ws.append(r)

for c in ws[1]:
    c.font = Font(bold=True, color='FFFFFF', size=11)
    c.fill = header_fill
    c.alignment = Alignment(horizontal='center', vertical='center')

for row in ws.iter_rows(min_row=2):
    row[0].font = Font(bold=True)
    row[1].font = Font(bold=True)
    for c in row:
        c.alignment = Alignment(wrap_text=True, vertical='top')
    row[2].font = Font(color='0563C1')

ws.column_dimensions['A'].width = 11
ws.column_dimensions['B'].width = 24
ws.column_dimensions['C'].width = 64
ws.column_dimensions['D'].width = 60
ws.freeze_panes = 'A2'

ws2 = wb.create_sheet('新同事上手要点')
tips = [
    ['#', '要点'],
    [1, '网站是纯静态站：没有数据库、没有后端，改 HTML/JS 就是改网站'],
    [2, '多语言原理：每种语言一个独立目录（/es/ = 西班牙语），页面内容已预渲染成对应语言，Google 可按语言分别收录'],
    [3, '英文永远是默认语言：打开 hashoer.com 根目录只会看到英文，不会按访客 IP 自动跳转'],
    [4, '语言切换 = 跳目录：点语言菜单会跳到对应子目录（如 /fr/），切换过的语言会被记住'],
    [5, '改完源页必须重跑生成器脚本，子目录页是自动生成的，手改子目录页会被下次生成覆盖'],
    [6, '产品数据全部在 products.js：设备目录、参数、多语名称都在这一个文件里'],
    [7, '上线 = git push：推送到 GitHub main 分支后约 1-2 分钟自动上线，无需手动部署'],
    [8, '出问题先看备份：git 标签 v1-live-20260929 可随时回退到多语言改造前的版本'],
    [9, '所有建站资料在 D:\\外贸行资料库\\06_独立站\\建站搭子\\，hashoer 与 druomu 两个站都在这里面，各改各的'],
]
for r in tips:
    ws2.append(r)
for c in ws2[1]:
    c.font = Font(bold=True, color='FFFFFF')
    c.fill = header_fill
ws2.column_dimensions['A'].width = 5
ws2.column_dimensions['B'].width = 110
for row in ws2.iter_rows(min_row=2):
    row[1].alignment = Alignment(wrap_text=True, vertical='top')

ws3 = wb.create_sheet('修改对比表')
diff_header = ['改动位置', '原内容（v1）', '修改后内容（v2）', '增/删/改']
diffs = [
    ['全部「本机资料」路径列（8 行）', r'C:\Users\Administrator\WorkBuddy\建站搭子\...', D2 := (NEW + r'\...'), '改'],
    ['新增行「druomu 站源文件」', '（无）', NEW + r'\druomu\site，注明与 hashoer 隔离', '增'],
    ['新增行「资料位置」', '（无）', '注明 2026-10-08 资料已搬至 D 盘，C 盘清空，线上不受影响', '增'],
    ['Sheet2 上手要点', '共 8 条', '新增第 9 条：资料新位置与两站隔离说明', '增'],
]
for r in [diff_header] + diffs:
    ws3.append(r)
for c in ws3[1]:
    c.font = Font(bold=True, color='FFFFFF')
    c.fill = header_fill
ws3.column_dimensions['A'].width = 30
ws3.column_dimensions['B'].width = 40
ws3.column_dimensions['C'].width = 55
ws3.column_dimensions['D'].width = 8
for row in ws3.iter_rows(min_row=2):
    for c in row:
        c.alignment = Alignment(wrap_text=True, vertical='top')

out = NEW + r'\hashoer-en\hashoer_建站资料位置表_v2.xlsx'
wb.save(out)
print('saved:', out)
