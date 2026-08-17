import os
import glob
import re

new_nav = """<div class="nav-dropdown-menu">
              <a href="/paw-care-academy.html" class="nav-dropdown-item">
                <img src="/assets/app-icons/paw-care-academy.jpg" alt="" class="nav-dropdown-item-icon" />
                <div class="nav-dropdown-item-info">
                  <strong>Paw Care Academy</strong>
                  <small>Pet Care Education (iOS)</small>
                </div>
              </a>
              <a href="/paintrail.html" class="nav-dropdown-item">
                <img src="/assets/app-icons/paintrail-256.png" alt="" class="nav-dropdown-item-icon" />
                <div class="nav-dropdown-item-info">
                  <strong>PainTrail</strong>
                  <small>Private Pain Journal (iOS)</small>
                </div>
              </a>
              <a href="/socialbar/" class="nav-dropdown-item">
                <img src="/assets/app-icons/socialbar.png" alt="" class="nav-dropdown-item-icon" />
                <div class="nav-dropdown-item-info">
                  <strong>SocialBar</strong>
                  <small>Menu Bar Socials (macOS)</small>
                </div>
              </a>
              <a href="/nextrole.html" class="nav-dropdown-item">
                <img src="/assets/nextrole/icon-1024.png" alt="" class="nav-dropdown-item-icon" />
                <div class="nav-dropdown-item-info">
                  <strong>NextRole</strong>
                  <small>Career Workspace (iOS)</small>
                </div>
              </a>
              <a href="/clearwaive.html" class="nav-dropdown-item">
                <img src="/assets/app-icons/clearwaive.svg" alt="" class="nav-dropdown-item-icon" />
                <div class="nav-dropdown-item-info">
                  <strong>ClearWaive</strong>
                  <small>Contractor COI Platform (Web)</small>
                </div>
              </a>
              <a href="/threadvigil/" class="nav-dropdown-item">
                <img src="/threadvigil/icon.png" alt="" class="nav-dropdown-item-icon" />
                <div class="nav-dropdown-item-info">
                  <strong>ThreadVigil</strong>
                  <small>Session Monitor (macOS)</small>
                </div>
              </a>
              <a href="/tallybar/" class="nav-dropdown-item">
                <img src="/tallybar/app-icon.png" alt="" class="nav-dropdown-item-icon" />
                <div class="nav-dropdown-item-info">
                  <strong>TallyBar</strong>
                  <small>Local Habit Tracking (macOS)</small>
                </div>
              </a>
              <a href="#" class="nav-dropdown-item">
                <img src="/assets/app-icons/draftflow.png" alt="" class="nav-dropdown-item-icon" />
                <div class="nav-dropdown-item-info">
                  <strong>DraftFlow</strong>
                  <small>On-Device Dictation (macOS)</small>
                </div>
              </a>
            </div>"""

for filepath in glob.glob("**/*.html", recursive=True):
    with open(filepath, 'r') as f:
        content = f.read()
    
    start_idx = content.find('<div class="nav-dropdown-menu">')
    if start_idx != -1:
        # The dropdown closes when we have an outer </div> that matches the indent or just before the next element
        # A simple hack: find the first `<div class="nav-dropdown-menu">` and the very next `            </div>\n          </div>` 
        # or just match using regex:
        pattern = r'<div class="nav-dropdown-menu">.*?</div>\n\s*</div>'
        new_content = re.sub(pattern, new_nav + '\n          </div>', content, flags=re.DOTALL)
        
        # If it didn't change anything, it means the closing tags didn't match. Let's try matching just `</div>` that is followed by `</div>`
        if new_content == content:
            pattern2 = r'<div class="nav-dropdown-menu">.*?</small>\n\s*</div>\n\s*</a>\n\s*</div>'
            new_content = re.sub(pattern2, new_nav, content, flags=re.DOTALL)
            
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

