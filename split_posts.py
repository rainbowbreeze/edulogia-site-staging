import os
import re

blog_dir = 'src/content/blog'

for filename in os.listdir(blog_dir):
    if not filename.endswith('.en.md'):
        continue
        
    filepath = os.path.join(blog_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Check if dual language by looking for " | " in the title
    if 'title: "' in content and ' | ' in content.split('title: "')[1].split('"')[0]:
        print(f"Splitting {filename}...")
        
        # Parse frontmatter
        parts = content.split('---')
        frontmatter = parts[1]
        body = parts[2]
        
        # Extract fields
        title_match = re.search(r'title: "(.*?)"', frontmatter)
        title_en, title_it = title_match.group(1).split(' | ')
        
        excerpt_match = re.search(r'excerpt: "(.*?)"', frontmatter)
        # Assuming excerpts are separated by ". "
        excerpt_full = excerpt_match.group(1)
        if '. ' in excerpt_full:
            # Finding the first period followed by a space that splits the languages
            # Heuristic: split by ". ", first part + "." is EN, rest is IT
            # e.g., "Discover why unstructured play is crucial for cognitive development. Scopri perché..."
            first_dot = excerpt_full.find('. ')
            if first_dot != -1:
                excerpt_en = excerpt_full[:first_dot+1]
                excerpt_it = excerpt_full[first_dot+2:]
            else:
                excerpt_en = excerpt_full
                excerpt_it = excerpt_full
        else:
            excerpt_en = excerpt_full
            excerpt_it = excerpt_full
            
        # Replace in frontmatter
        fm_en = frontmatter.replace(f'title: "{title_match.group(1)}"', f'title: "{title_en}"')
        fm_en = fm_en.replace(f'excerpt: "{excerpt_full}"', f'excerpt: "{excerpt_en}"')
        
        fm_it = frontmatter.replace(f'title: "{title_match.group(1)}"', f'title: "{title_it}"')
        fm_it = fm_it.replace(f'excerpt: "{excerpt_full}"', f'excerpt: "{excerpt_it}"')
        
        # Date translation to Italian in frontmatter
        # date: "January 15, 2025" -> "15 Gennaio 2025"
        # We can just leave date as is for now or translate months
        months = {
            "January": "Gennaio", "February": "Febbraio", "March": "Marzo", 
            "April": "Aprile", "May": "Maggio", "June": "Giugno", 
            "July": "Luglio", "August": "Agosto", "September": "Settembre", 
            "October": "Ottobre", "November": "Novembre", "December": "Dicembre"
        }
        date_match = re.search(r'date: "(.*?)"', fm_it)
        if date_match:
            date_str = date_match.group(1)
            for eng, ita in months.items():
                if eng in date_str:
                    # Example: "January 15, 2025" -> "15 Gennaio 2025"
                    m = re.match(rf'{eng}\s+(\d+),\s+(\d+)', date_str)
                    if m:
                        new_date = f"{m.group(1)} {ita} {m.group(2)}"
                        fm_it = fm_it.replace(f'date: "{date_str}"', f'date: "{new_date}"')
                    break
                    
        # Categories translation
        cats = {
            "Development": "Sviluppo", "Psychology": "Psicologia", 
            "Activities": "Attività", "Literacy": "Alfabetizzazione",
            "Education": "Educazione", "Creativity": "Creatività",
            "Health": "Salute"
        }
        cat_match = re.search(r'category: "(.*?)"', fm_it)
        if cat_match:
            cat_str = cat_match.group(1)
            if cat_str in cats:
                fm_it = fm_it.replace(f'category: "{cat_str}"', f'category: "{cats[cat_str]}"')
        
        # Split body
        # Usually it's \n# EN Title\nEN body\n# IT Title\nIT body
        # We can split by "\n# " + title_it
        split_token = f"\n# {title_it}"
        if split_token in body:
            body_en, body_it = body.split(split_token)
            # Remove the first "\n" from body_en if it exists
            body_it = f"\n# {title_it}{body_it}"
        else:
            # Try just `# IT Title`
            split_token2 = f"# {title_it}"
            if split_token2 in body:
                body_en, body_it = body.split(split_token2)
                body_it = f"# {title_it}{body_it}"
            else:
                body_en = body
                body_it = ""
                
        # Write EN
        with open(filepath, 'w') as f:
            f.write(f"---{fm_en}---{body_en}")
            
        # Write IT
        it_filepath = filepath.replace('.en.md', '.it.md')
        with open(it_filepath, 'w') as f:
            f.write(f"---{fm_it}---{body_it}")

