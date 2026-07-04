<!-- Source: design system provided by PGS, July 4, 2026. Content below is unmodified except for this header.
     Note: this doc's explanatory prose is in French (the founder's own working notes).
     All actual UI/product copy strings inside it are already in English — see CLAUDE.md for the English-only rule. -->

Voici un design system orienté conversion pour Personal Metadata, pensé pour un produit gratuit, premium, mystique mais crédible.

Design System — Personal Metadata

1. Direction créative

Le design doit donner une sensation de :

Mystique + premium + confiance + introspection moderne

Pas trop "voyance cheap", pas trop "SaaS froid".

Positionnement visuel recommandé :

Spotify Wrapped x Co-Star x Notion premium x wellness brand

L'utilisateur doit ressentir :

"C'est beau, personnel, sérieux, et j'ai envie de voir mon rapport."

⸻

2. Principe de conversion principal

Le design doit convertir grâce à 4 leviers :

Levier	Objectif
Curiosity gap	Donner envie de découvrir son rapport
Personalization	Faire sentir que l'expérience est unique
Trust	Rassurer sur les données et le disclaimer
Reward	Donner une expérience visuelle satisfaisante après le formulaire

La règle :

Chaque écran doit pousser doucement vers l'action suivante sans paraître agressif.

⸻

3. Identité visuelle

Style global

Premium mystical minimalism

À éviter :

* trop de violet néon
* symboles ésotériques clichés partout
* cartes tarot cheap
* étoiles partout
* gros textes "destiny / fate / prediction"

À privilégier :

* gradients profonds
* typographie élégante
* cartes sombres avec glow subtil
* visualisations abstraites
* langage clair et rassurant

⸻

4. Palette de couleurs

Palette principale

Usage	Couleur	Hex
Background principal	Midnight Navy	#080B1A
Background secondaire	Deep Indigo	#11152B
Surface card	Cosmic Slate	#171B35
Surface elevated	Mystic Blue	#20264A
Texte principal	Soft White	#F8F6F0
Texte secondaire	Mist Gray	#B8B6C9
Texte muted	Lunar Gray	#7E819C
Accent principal	Celestial Gold	#D8B76A
Accent secondaire	Aurora Violet	#9B7CFF
Accent émotionnel	Rose Quartz	#E7A6C8
Succès	Soft Emerald	#7DD9A5
Warning	Warm Amber	#F6C66A
Erreur	Soft Red	#F87171

Gradient principal

À utiliser sur hero, CTA premium, cover du rapport :

background: radial-gradient(circle at top left, #9B7CFF 0%, transparent 28%),
            radial-gradient(circle at bottom right, #D8B76A 0%, transparent 22%),
            linear-gradient(135deg, #080B1A 0%, #11152B 55%, #171B35 100%);

Règle de conversion

Utilise Celestial Gold uniquement pour :

* CTA principal
* éléments clés du rapport
* badges de résultat
* progression importante

Comme ça, l'œil comprend immédiatement où cliquer.

⸻

5. Typographies

Recommandation

Usage	Font
Titres premium	Cormorant Garamond ou Playfair Display
Texte UI	Inter
Données / chiffres	IBM Plex Mono ou Geist Mono

Hiérarchie

Hero title: 48-64px desktop / 36-42px mobile
Section title: 32-40px desktop / 28-32px mobile
Card title: 20-24px
Body: 16-18px
Small text: 13-14px
Microcopy: 12-13px

Exemple

Hero :

Discover your Personal Metadata

Sous-titre :

A symbolic self-reflection report based on your name and birth data.

CTA :

Generate my free report

⸻

6. Ton visuel

Do

Utiliser des mots comme :

* discover
* reflect
* explore
* patterns
* symbolic
* personal
* insight
* mirror
* guide

Don't

Éviter :

* predict
* destiny guaranteed
* your future
* scientific analysis
* truth
* diagnosis
* soulmate guaranteed

⸻

7. Logo

Concept recommandé

Logo simple :

Personal Metadata
avec un symbole abstrait : cercle + point + lignes orbitales.

Idée :

◎ Personal Metadata

Ou :

✦ Personal Metadata

Mais mieux en custom SVG :

* cercle central = personne
* orbite = cycles
* points = données symboliques
* étoile subtile = introspection

Style logo

* Blanc cassé sur fond sombre
* Gold sur fond clair/sombre pour accent
* Pas de logo trop ésotérique

⸻

8. Layout global

Grid

Desktop :

* max-width : 1120px
* padding horizontal : 32px
* section spacing : 96px

Mobile :

* padding : 20px
* section spacing : 56px

Border radius

Élément	Radius
Buttons	999px
Cards	24px
Inputs	16px
Modals	28px
Report cards	28px

Shadows

Subtiles, pas SaaS classique.

box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);

Glow CTA :

box-shadow: 0 0 32px rgba(216, 183, 106, 0.28);

⸻

9. Composants principaux

9.1 CTA Button

Primary CTA

Texte recommandé :

* Generate my free report
* Start my symbolic reading
* Discover my metadata

Style :

background: linear-gradient(135deg, #D8B76A, #F6D98B);
color: #080B1A;
border-radius: 999px;
font-weight: 700;
padding: 14px 24px;

Hover :

* léger scale 1.02
* glow plus visible
* pas d'animation excessive

Secondary CTA

background: rgba(255,255,255,0.06);
border: 1px solid rgba(255,255,255,0.12);
color: #F8F6F0;

Texte :

* See sample report
* How it works

⸻

9.2 Input fields

Les inputs doivent être rassurants.

Style :

* fond sombre légèrement plus clair
* bordure fine
* label clair
* helper text utile

Exemple :

First name
[ Emma ]
Used to personalize your report.

Pour les champs sensibles :

Birth time
[ 08:30 ]
Optional — helps calculate more precise symbolic insights.

⸻

9.3 Progress bar

Le formulaire doit donner une sensation d'avancement.

Step 2 of 4
████████░░░░ 50%

Style :

* track : rgba(255,255,255,0.08)
* progress : gradient gold → violet
* texte : "Almost there" vers la fin

Microcopy :

* Step 1: "Let's start with your name."
* Step 2: "Now your birth date."
* Step 3: "Optional precision details."
* Step 4: "Where should we send your report?"

⸻

9.4 Trust badges

À placer sous CTA et formulaire.

Exemples :

Free report
No payment required
Private by default
Reflection tool, not a prediction

Icônes :

* lock
* sparkle
* document
* shield

⸻

9.5 Report cards

Chaque résultat doit ressembler à une "révélation".

Structure :

╭────────────────────────────╮
│ Life Path Number           │
│                            │
│          7                 │
│                            │
│ The Seeker                 │
│                            │
│ You are drawn to meaning,  │
│ depth, and hidden patterns.│
╰────────────────────────────╯

Le chiffre ou signe doit être très visible.

⸻

10. Landing page qui convertit

Structure recommandée

Section 1 — Hero

Objectif : faire commencer le formulaire.

Discover your Personal Metadata
A free symbolic self-reflection report based on your name and birth data.
[Generate my free report]
Free · No payment required · Takes 2 minutes

À droite ou en arrière-plan :

* preview card animée
* cercle astrologique abstrait
* carte "Life Path 7"
* mini rapport flouté

⸻

Section 2 — Curiosity cards

Your report explores:

Cards :

1. Your Core Number
2. Your Symbolic Strengths
3. Your Inner Patterns
4. Your Current Personal Year

Chaque card doit teaser, pas tout expliquer.

⸻

Section 3 — How it works

Simple :

1. Enter your birth details
2. We calculate your symbolic metadata
3. You receive your free personalized report

CTA répété :

Generate my free report

⸻

Section 4 — Sample report

Très important pour la conversion.

Afficher une fausse preview anonymisée :

Sample insight
"Your profile suggests a strong tension between independence and emotional depth. This can show up as a desire to create your own path while still seeking meaningful connection."

CTA :

Create my own report

⸻

Section 5 — Trust / Ethics

A reflection tool, not a prediction engine.
Personal Metadata is designed for self-reflection and entertainment. It does not provide medical, psychological, financial, legal, or professional advice.

Ça renforce la confiance.

⸻

11. Formulaire qui convertit

Règle

Ne montre jamais tous les champs d'un coup.

Flow recommandé

Step 1 — Name

What should we call you?
First name *
Last name optional
[Continue]

Pourquoi :

* le prénom crée la personnalisation
* le nom ne doit pas être obligatoire au début

⸻

Step 2 — Birth date

When were you born?
Birth date *
[Continue]

Microcopy :

Used to calculate your core symbolic numbers and cycles.

⸻

Step 3 — Optional precision

Want a more detailed report?
Birth time optional
Birth location optional
[Continue]
[Skip this step]

Important : ne pas faire peur.

⸻

Step 4 — Email

Where should we send your free report?
Email *
[Generate my free report]

Checkboxes :

[ ] I understand this is a reflection and entertainment tool, not professional advice.
[ ] I agree to receive my report by email.
[ ] I want occasional updates and new free insights. Optional.

⸻

12. Loading screen

La génération doit être un moment émotionnel.

Évite un simple spinner.

Exemple :

Creating your symbolic profile...
✓ Calculating your core numbers
✓ Mapping your personal year
✓ Connecting your symbolic patterns
→ Writing your personalized report

Durée ressentie : 4 à 8 secondes.

Même si c'est rapide, garde une micro-animation de 2 secondes pour renforcer la valeur perçue.

⸻

13. Rapport gratuit

Structure idéale

Le rapport gratuit doit être assez généreux pour créer de la valeur.

Sections :

1. Cover personnalisée
2. Core symbolic profile
3. Life Path / Core Number
4. Expression / Personality pattern
5. Personal Year
6. Top 3 strengths
7. 2 growth areas
8. Practical reflection prompts
9. Disclaimer
10. Email/save/share CTA

CTA final

Comme le produit est gratuit, l'objectif devient :

* partage
* inscription
* retour
* feedback

CTA :

Share my profile
Send me future insights
Generate another report
Give feedback

⸻

14. Share cards

Très important pour acquisition organique.

Créer des cards carrées partageables :

Format :

* 1080x1080
* fond gradient
* symbole central
* prénom
* résultat clé

Exemple :

Emma's Personal Metadata
Life Path 7
The Seeker
Depth · Intuition · Inner Wisdom

CTA discret :

personalmetadata.com

Ne pas afficher données sensibles.

⸻

15. Composants à prévoir

Core components

* Button
* Input
* DateInput
* ProgressBar
* TrustBadge
* FeatureCard
* ReportCard
* InsightCard
* NumberBadge
* SymbolBadge
* DisclaimerBox
* ShareCard
* LoadingSequence
* SectionHeader
* FAQItem
* EmailCapture

⸻

16. Design du rapport

Le rapport doit donner une impression de valeur même s'il est gratuit.

Report cover

Personal Metadata Report
Prepared for Emma
Generated on July 4, 2026
A symbolic self-reflection profile based on your name and birth data.

Visuel :

* cercle orbital
* gradient sombre
* badge "Free Report"

⸻

Report navigation

Sur desktop :

* sommaire sticky à gauche

Sur mobile :

* menu sticky compact

Sections :

* Overview
* Core Number
* Symbolic Patterns
* Personal Year
* Strengths
* Growth Areas
* Reflection Prompts

⸻

Report cards

Chaque section doit avoir :

* titre clair
* résultat visible
* interprétation courte
* conseil pratique
* question de réflexion

Exemple :

Life Path 7
Theme: The Seeker
This number is often associated with depth, analysis, intuition, and the search for meaning.
Reflection prompt:
Where in your life are you currently seeking deeper truth instead of surface-level answers?

⸻

17. Animations

Utilise des animations subtiles.

Bonnes animations

* fade in
* slide up léger
* glow très lent
* progress bar fluide
* cards qui apparaissent une par une
* orbite lente en background

À éviter

* trop de particules
* étoiles qui clignotent partout
* animations lourdes
* scroll janky
* effets trop "crypto"

⸻

18. Copywriting UI

CTA principaux

* Generate my free report
* Discover my metadata
* Start my symbolic profile
* Reveal my core pattern

Microcopy rassurant

* No payment required
* Takes about 2 minutes
* Your data stays private
* You can skip optional details
* This is a reflection tool, not a prediction

Titres de section

* What your metadata explores
* A symbolic mirror, not a fixed identity
* Your free report includes
* Designed for reflection
* Built with privacy in mind

⸻

19. Page FAQ

FAQ recommandée :

Is this free?
Yes. The report is free while the product is in early access.
Is this scientific?
No. Personal Metadata is a symbolic reflection and entertainment tool.
Do I need my birth time?
No. Birth time is optional. It may allow more detailed symbolic interpretations later.
Why do you ask for my email?
To send your report link and allow you to access it again.
Can I delete my data?
Yes. You can request deletion of your data at any time.
Is this medical or psychological advice?
No. It should never replace professional advice.

⸻

20. Conversion checklist

Avant de builder, vérifie que chaque page a :

* un CTA principal visible sans scroll
* une promesse claire en moins de 8 secondes
* une mention "free" visible
* une preuve de valeur : sample, preview, screenshot
* une preuve de confiance : privacy, disclaimer, no payment
* un formulaire mobile-first
* des champs optionnels clairement indiqués
* un résultat visuellement satisfaisant
* un CTA de partage après génération

⸻

21. Exemple de homepage en anglais

Hero
Discover your Personal Metadata
A free symbolic self-reflection report based on your name and birth data.
Explore your core number, personal patterns, symbolic strengths, and current life cycle — through a modern, reflective lens.
[Generate my free report]
Free · No payment required · Takes 2 minutes

⸻

Section
What your free report includes
Core Number
Discover the symbolic number associated with your birth date.
Personal Patterns
Explore recurring themes connected to your name and date of birth.
Strengths & Growth Areas
Receive a balanced reflection on your natural tendencies.
Reflection Prompts
Turn your report into practical journaling and self-awareness exercises.

⸻

Ethics section
A symbolic mirror, not a prediction.
Personal Metadata is designed for reflection, self-awareness, and entertainment. It does not provide scientific, medical, psychological, legal, financial, or professional advice.

⸻

22. Design system résumé

Élément	Recommandation
Style	Premium mystical minimalism
Background	Dark navy / indigo
Accent	Gold + violet
Font titres	Cormorant Garamond ou Playfair Display
Font UI	Inter
CTA	Gold, rounded, très visible
Layout	Mobile-first, cards premium
Form	Multi-step, progressif, rassurant
Rapport	Cards visuelles + insights courts
Conversion	Curiosity + trust + free + personalization
Éthique	Disclaimer clair, non anxiogène
Viral	Share cards anonymisées

La meilleure direction : un produit sombre, élégant, intime, avec des cartes de résultats très partageables et un formulaire ultra simple. Le design doit vendre une expérience personnelle, pas une croyance absolue.
