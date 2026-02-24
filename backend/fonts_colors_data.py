"""
Comprehensive Fonts and Colors Database for Ayumi
Hundreds of fonts and highlight colors
"""

# Comprehensive Font Library
FONTS = [
    # Serif Fonts
    {"id": "georgia", "name": "Georgia", "family": "Georgia, serif", "category": "serif", "weight": "normal", "is_web_safe": True},
    {"id": "times", "name": "Times New Roman", "family": "'Times New Roman', Times, serif", "category": "serif", "weight": "normal", "is_web_safe": True},
    {"id": "garamond", "name": "Garamond", "family": "Garamond, serif", "category": "serif", "weight": "normal", "is_web_safe": True},
    {"id": "palatino", "name": "Palatino", "family": "'Palatino Linotype', 'Book Antiqua', Palatino, serif", "category": "serif", "weight": "normal", "is_web_safe": True},
    {"id": "baskerville", "name": "Baskerville", "family": "Baskerville, 'Baskerville Old Face', 'Hoefler Text', Garamond, serif", "category": "serif", "weight": "normal", "is_web_safe": False},
    
    # Sans-Serif Fonts
    {"id": "arial", "name": "Arial", "family": "Arial, Helvetica, sans-serif", "category": "sans-serif", "weight": "normal", "is_web_safe": True},
    {"id": "helvetica", "name": "Helvetica", "family": "Helvetica, Arial, sans-serif", "category": "sans-serif", "weight": "normal", "is_web_safe": True},
    {"id": "verdana", "name": "Verdana", "family": "Verdana, Geneva, sans-serif", "category": "sans-serif", "weight": "normal", "is_web_safe": True},
    {"id": "tahoma", "name": "Tahoma", "family": "Tahoma, Geneva, sans-serif", "category": "sans-serif", "weight": "normal", "is_web_safe": True},
    {"id": "trebuchet", "name": "Trebuchet MS", "family": "'Trebuchet MS', Helvetica, sans-serif", "category": "sans-serif", "weight": "normal", "is_web_safe": True},
    {"id": "segoe", "name": "Segoe UI", "family": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", "category": "sans-serif", "weight": "normal", "is_web_safe": True},
    {"id": "calibri", "name": "Calibri", "family": "Calibri, Candara, Segoe, Optima, Arial, sans-serif", "category": "sans-serif", "weight": "normal", "is_web_safe": False},
    
    # Monospace Fonts
    {"id": "courier", "name": "Courier New", "family": "'Courier New', Courier, monospace", "category": "monospace", "weight": "normal", "is_web_safe": True},
    {"id": "monaco", "name": "Monaco", "family": "Monaco, 'Lucida Console', monospace", "category": "monospace", "weight": "normal", "is_web_safe": True},
    {"id": "consolas", "name": "Consolas", "family": "Consolas, monaco, monospace", "category": "monospace", "weight": "normal", "is_web_safe": False},
    
    # Display/Decorative Fonts
    {"id": "impact", "name": "Impact", "family": "Impact, Haettenschweiler, 'Franklin Gothic Bold', sans-serif", "category": "display", "weight": "bold", "is_web_safe": True},
    {"id": "comic-sans", "name": "Comic Sans MS", "family": "'Comic Sans MS', cursive, sans-serif", "category": "display", "weight": "normal", "is_web_safe": True},
    
    # Google Fonts - Serif
    {"id": "merriweather", "name": "Merriweather", "family": "'Merriweather', serif", "category": "serif", "weight": "normal", "google_font": True},
    {"id": "lora", "name": "Lora", "family": "'Lora', serif", "category": "serif", "weight": "normal", "google_font": True},
    {"id": "playfair", "name": "Playfair Display", "family": "'Playfair Display', serif", "category": "serif", "weight": "normal", "google_font": True},
    {"id": "eb-garamond", "name": "EB Garamond", "family": "'EB Garamond', serif", "category": "serif", "weight": "normal", "google_font": True},
    {"id": "libre-baskerville", "name": "Libre Baskerville", "family": "'Libre Baskerville', serif", "category": "serif", "weight": "normal", "google_font": True},
    {"id": "crimson-text", "name": "Crimson Text", "family": "'Crimson Text', serif", "category": "serif", "weight": "normal", "google_font": True},
    {"id": "old-standard", "name": "Old Standard TT", "family": "'Old Standard TT', serif", "category": "serif", "weight": "normal", "google_font": True},
    
    # Google Fonts - Sans-Serif
    {"id": "roboto", "name": "Roboto", "family": "'Roboto', sans-serif", "category": "sans-serif", "weight": "normal", "google_font": True},
    {"id": "open-sans", "name": "Open Sans", "family": "'Open Sans', sans-serif", "category": "sans-serif", "weight": "normal", "google_font": True},
    {"id": "lato", "name": "Lato", "family": "'Lato', sans-serif", "category": "sans-serif", "weight": "normal", "google_font": True},
    {"id": "montserrat", "name": "Montserrat", "family": "'Montserrat', sans-serif", "category": "sans-serif", "weight": "normal", "google_font": True},
    {"id": "source-sans", "name": "Source Sans Pro", "family": "'Source Sans Pro', sans-serif", "category": "sans-serif", "weight": "normal", "google_font": True},
    {"id": "raleway", "name": "Raleway", "family": "'Raleway', sans-serif", "category": "sans-serif", "weight": "normal", "google_font": True},
    {"id": "poppins", "name": "Poppins", "family": "'Poppins', sans-serif", "category": "sans-serif", "weight": "normal", "google_font": True},
    {"id": "nunito", "name": "Nunito", "family": "'Nunito', sans-serif", "category": "sans-serif", "weight": "normal", "google_font": True},
    {"id": "inter", "name": "Inter", "family": "'Inter', sans-serif", "category": "sans-serif", "weight": "normal", "google_font": True},
    {"id": "work-sans", "name": "Work Sans", "family": "'Work Sans', sans-serif", "category": "sans-serif", "weight": "normal", "google_font": True},
    
    # Handwriting/Script
    {"id": "dancing-script", "name": "Dancing Script", "family": "'Dancing Script', cursive", "category": "handwriting", "weight": "normal", "google_font": True},
    {"id": "pacifico", "name": "Pacifico", "family": "'Pacifico', cursive", "category": "handwriting", "weight": "normal", "google_font": True},
    {"id": "shadows-into-light", "name": "Shadows Into Light", "family": "'Shadows Into Light', cursive", "category": "handwriting", "weight": "normal", "google_font": True},
    {"id": "indie-flower", "name": "Indie Flower", "family": "'Indie Flower', cursive", "category": "handwriting", "weight": "normal", "google_font": True},
    {"id": "caveat", "name": "Caveat", "family": "'Caveat', cursive", "category": "handwriting", "weight": "normal", "google_font": True},
    
    # Special Purpose
    {"id": "oswald", "name": "Oswald", "family": "'Oswald', sans-serif", "category": "display", "weight": "normal", "google_font": True},
    {"id": "anton", "name": "Anton", "family": "'Anton', sans-serif", "category": "display", "weight": "bold", "google_font": True},
    {"id": "bebas-neue", "name": "Bebas Neue", "family": "'Bebas Neue', cursive", "category": "display", "weight": "normal", "google_font": True},
]

# Add font variations (light, regular, medium, bold, etc.)
FONT_VARIATIONS = []
for font in FONTS[:20]:  # Create variations for main fonts
    for weight in ["300", "normal", "500", "600", "bold", "800"]:
        weight_name = {"300": "Light", "normal": "Regular", "500": "Medium", "600": "Semi-Bold", "bold": "Bold", "800": "Extra-Bold"}
        FONT_VARIATIONS.append({
            "id": f"{font['id']}-{weight}",
            "name": f"{font['name']} {weight_name[weight]}",
            "family": font['family'],
            "category": font['category'],
            "weight": weight,
            "is_web_safe": font.get('is_web_safe', False),
            "google_font": font.get('google_font', False)
        })

ALL_FONTS = FONTS + FONT_VARIATIONS

# Comprehensive Highlight Colors
HIGHLIGHT_COLORS = [
    # Warm Colors
    {"id": "yellow", "name": "Yellow", "hex_color": "#FFEB3B", "rgba": "rgba(255, 235, 59, 0.4)", "category": "warm"},
    {"id": "amber", "name": "Amber", "hex_color": "#FFC107", "rgba": "rgba(255, 193, 7, 0.4)", "category": "warm"},
    {"id": "orange", "name": "Orange", "hex_color": "#FF9800", "rgba": "rgba(255, 152, 0, 0.4)", "category": "warm"},
    {"id": "deep-orange", "name": "Deep Orange", "hex_color": "#FF5722", "rgba": "rgba(255, 87, 34, 0.4)", "category": "warm"},
    {"id": "red", "name": "Red", "hex_color": "#F44336", "rgba": "rgba(244, 67, 54, 0.4)", "category": "warm"},
    {"id": "pink", "name": "Pink", "hex_color": "#E91E63", "rgba": "rgba(233, 30, 99, 0.4)", "category": "warm"},
    
    # Cool Colors
    {"id": "purple", "name": "Purple", "hex_color": "#9C27B0", "rgba": "rgba(156, 39, 176, 0.4)", "category": "cool"},
    {"id": "deep-purple", "name": "Deep Purple", "hex_color": "#673AB7", "rgba": "rgba(103, 58, 183, 0.4)", "category": "cool"},
    {"id": "indigo", "name": "Indigo", "hex_color": "#3F51B5", "rgba": "rgba(63, 81, 181, 0.4)", "category": "cool"},
    {"id": "blue", "name": "Blue", "hex_color": "#2196F3", "rgba": "rgba(33, 150, 243, 0.4)", "category": "cool"},
    {"id": "light-blue", "name": "Light Blue", "hex_color": "#03A9F4", "rgba": "rgba(3, 169, 244, 0.4)", "category": "cool"},
    {"id": "cyan", "name": "Cyan", "hex_color": "#00BCD4", "rgba": "rgba(0, 188, 212, 0.4)", "category": "cool"},
    {"id": "teal", "name": "Teal", "hex_color": "#009688", "rgba": "rgba(0, 150, 136, 0.4)", "category": "cool"},
    
    # Green Spectrum
    {"id": "green", "name": "Green", "hex_color": "#4CAF50", "rgba": "rgba(76, 175, 80, 0.4)", "category": "green"},
    {"id": "light-green", "name": "Light Green", "hex_color": "#8BC34A", "rgba": "rgba(139, 195, 74, 0.4)", "category": "green"},
    {"id": "lime", "name": "Lime", "hex_color": "#CDDC39", "rgba": "rgba(205, 220, 57, 0.4)", "category": "green"},
    {"id": "olive", "name": "Olive", "hex_color": "#808000", "rgba": "rgba(128, 128, 0, 0.4)", "category": "green"},
    
    # Neutral Colors
    {"id": "brown", "name": "Brown", "hex_color": "#795548", "rgba": "rgba(121, 85, 72, 0.4)", "category": "neutral"},
    {"id": "grey", "name": "Grey", "hex_color": "#9E9E9E", "rgba": "rgba(158, 158, 158, 0.4)", "category": "neutral"},
    {"id": "blue-grey", "name": "Blue Grey", "hex_color": "#607D8B", "rgba": "rgba(96, 125, 139, 0.4)", "category": "neutral"},
    
    # Pastel Colors
    {"id": "pastel-pink", "name": "Pastel Pink", "hex_color": "#FFD1DC", "rgba": "rgba(255, 209, 220, 0.4)", "category": "pastel"},
    {"id": "pastel-blue", "name": "Pastel Blue", "hex_color": "#AEC6CF", "rgba": "rgba(174, 198, 207, 0.4)", "category": "pastel"},
    {"id": "pastel-green", "name": "Pastel Green", "hex_color": "#B5EAD7", "rgba": "rgba(181, 234, 215, 0.4)", "category": "pastel"},
    {"id": "pastel-yellow", "name": "Pastel Yellow", "hex_color": "#FFFACD", "rgba": "rgba(255, 250, 205, 0.4)", "category": "pastel"},
    {"id": "pastel-purple", "name": "Pastel Purple", "hex_color": "#E0BBE4", "rgba": "rgba(224, 187, 228, 0.4)", "category": "pastel"},
    {"id": "pastel-orange", "name": "Pastel Orange", "hex_color": "#FFDAB9", "rgba": "rgba(255, 218, 185, 0.4)", "category": "pastel"},
    
    # Vivid Colors
    {"id": "vivid-red", "name": "Vivid Red", "hex_color": "#FF0000", "rgba": "rgba(255, 0, 0, 0.4)", "category": "vivid"},
    {"id": "vivid-blue", "name": "Vivid Blue", "hex_color": "#0000FF", "rgba": "rgba(0, 0, 255, 0.4)", "category": "vivid"},
    {"id": "vivid-green", "name": "Vivid Green", "hex_color": "#00FF00", "rgba": "rgba(0, 255, 0, 0.4)", "category": "vivid"},
    {"id": "vivid-yellow", "name": "Vivid Yellow", "hex_color": "#FFFF00", "rgba": "rgba(255, 255, 0, 0.4)", "category": "vivid"},
    {"id": "vivid-cyan", "name": "Vivid Cyan", "hex_color": "#00FFFF", "rgba": "rgba(0, 255, 255, 0.4)", "category": "vivid"},
    {"id": "vivid-magenta", "name": "Vivid Magenta", "hex_color": "#FF00FF", "rgba": "rgba(255, 0, 255, 0.4)", "category": "vivid"},
    
    # Earth Tones
    {"id": "sienna", "name": "Sienna", "hex_color": "#A0522D", "rgba": "rgba(160, 82, 45, 0.4)", "category": "earth"},
    {"id": "tan", "name": "Tan", "hex_color": "#D2B48C", "rgba": "rgba(210, 180, 140, 0.4)", "category": "earth"},
    {"id": "wheat", "name": "Wheat", "hex_color": "#F5DEB3", "rgba": "rgba(245, 222, 179, 0.4)", "category": "earth"},
    {"id": "khaki", "name": "Khaki", "hex_color": "#C3B091", "rgba": "rgba(195, 176, 145, 0.4)", "category": "earth"},
    {"id": "sage", "name": "Sage", "hex_color": "#9CAF88", "rgba": "rgba(156, 175, 136, 0.4)", "category": "earth"},
]

# Add lighter and darker variations
COLOR_VARIATIONS = []
for color in HIGHLIGHT_COLORS[:15]:
    COLOR_VARIATIONS.extend([
        {
            "id": f"{color['id']}-light",
            "name": f"{color['name']} Light",
            "hex_color": color['hex_color'],
            "rgba": color['hex_color'].replace("0.4", "0.2"),
            "category": f"{color['category']}-light"
        },
        {
            "id": f"{color['id']}-dark",
            "name": f"{color['name']} Dark",
            "hex_color": color['hex_color'],
            "rgba": color['hex_color'].replace("0.4", "0.6"),
            "category": f"{color['category']}-dark"
        }
    ])

ALL_COLORS = HIGHLIGHT_COLORS + COLOR_VARIATIONS


def get_all_fonts():
    """Get all available fonts"""
    return ALL_FONTS


def get_fonts_by_category(category: str):
    """Get fonts by category"""
    return [f for f in ALL_FONTS if f["category"] == category]


def get_font_by_id(font_id: str):
    """Get specific font by ID"""
    for f in ALL_FONTS:
        if f["id"] == font_id:
            return f
    return None


def get_all_colors():
    """Get all highlight colors"""
    return ALL_COLORS


def get_colors_by_category(category: str):
    """Get colors by category"""
    return [c for c in ALL_COLORS if c["category"] == category]


def get_color_by_id(color_id: str):
    """Get specific color by ID"""
    for c in ALL_COLORS:
        if c["id"] == color_id:
            return c
    return None
