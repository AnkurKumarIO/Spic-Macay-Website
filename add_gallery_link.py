import glob, os

for file in glob.glob('*.html'):
    if file == 'gallery.html':
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # 1) Main nav
    old_nav = '<li><a href="faq.html" >FAQ</a></li>'
    new_nav = '<li><a href="gallery.html">Gallery</a></li>\n          <li><a href="faq.html" >FAQ</a></li>'
    if old_nav in content and '<li><a href="gallery.html">Gallery</a></li>' not in content:
        content = content.replace(old_nav, new_nav)
        modified = True
        
    # 2) Drawer link
    old_drawer = '<a href="faq.html" class="drawer-link ">FAQ</a>'
    new_drawer = '<a href="gallery.html" class="drawer-link">Gallery</a>\n    <a href="faq.html" class="drawer-link ">FAQ</a>'
    if old_drawer in content and '<a href="gallery.html" class="drawer-link">Gallery</a>' not in content:
        content = content.replace(old_drawer, new_drawer)
        modified = True
        
    # 3) Drawer link (active variant, if faq is active)
    old_drawer_active = '<a href="faq.html" class="drawer-link active">FAQ</a>'
    new_drawer_active = '<a href="gallery.html" class="drawer-link">Gallery</a>\n    <a href="faq.html" class="drawer-link active">FAQ</a>'
    if old_drawer_active in content and '<a href="gallery.html" class="drawer-link">Gallery</a>' not in content:
        content = content.replace(old_drawer_active, new_drawer_active)
        modified = True

    # 4) Footer link
    old_footer = '<li><a href="faq.html">FAQ</a></li>'
    new_footer = '<li><a href="gallery.html">Gallery</a></li>\n              <li><a href="faq.html">FAQ</a></li>'
    if old_footer in content and '<li><a href="gallery.html">Gallery</a></li>' not in content:
        content = content.replace(old_footer, new_footer)
        modified = True

    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
