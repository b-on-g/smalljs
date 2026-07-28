# Événements

L'interactivité vient des gestionnaires d'événements. Le view.tree relie déjà le `click` du bouton à une action `inc?` — vous implémentez `inc` dans view.ts sous la forme d'un `@ $mol_action` qui modifie l'état.

**Objectif :** faire en sorte que le bouton augmente le compteur à chaque clic.
