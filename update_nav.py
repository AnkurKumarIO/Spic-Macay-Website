import glob, os

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # Nav links
    old_nav = '<li><a href="faq.html">FAQ</a></li>'
    new_nav = '<li><a href="gallery.html">Gallery</a></li>\n          <li><a href="faq.html">FAQ</a></li>'
    if old_nav in content and '<li><a href="gallery.html">Gallery</a></li>' not in content:
        content = content.replace(old_nav, new_nav)
        modified = True
        
    # Drawer links
    old_drawer = '<a href="faq.html" class="drawer-link">FAQ</a>'
    new_drawer = '<a href="gallery.html" class="drawer-link">Gallery</a>\n    <a href="faq.html" class="drawer-link">FAQ</a>'
    if old_drawer in content and '<a href="gallery.html" class="drawer-link">Gallery</a>' not in content:
        content = content.replace(old_drawer, new_drawer)
        modified = True
        
    # Active drawer links (if any)
    old_drawer_active = '<a href="faq.html" class="drawer-link active">FAQ</a>'
    new_drawer_active = '<a href="gallery.html" class="drawer-link">Gallery</a>\n    <a href="faq.html" class="drawer-link active">FAQ</a>'
    if old_drawer_active in content and '<a href="gallery.html" class="drawer-link">Gallery</a>' not in content:
        content = content.replace(old_drawer_active, new_drawer_active)
        modified = True
        
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
