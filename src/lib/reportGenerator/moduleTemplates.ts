/**
 * Module Templates
 * Secondary modifier content blocks
 */

import type { SecondaryModifier } from './types';

export interface ModuleTemplate {
    name: SecondaryModifier;
    internal_id: string;

    // How it manifests
    how_it_shows_up: string;

    // Why it makes sense
    why_it_makes_sense: string;

    // Specific tells (3-5)
    tells: string[];

    // Brief description for paid report
    full_description: string;
}

export const MODULE_TEMPLATES: Record<SecondaryModifier, ModuleTemplate> = {
    'Anxious Pursuit': {
        name: 'Anxious Pursuit',
        internal_id: 'MOD_ANXIOUS_PURSUIT',

        how_it_shows_up: `When this modifier activates, you find yourself moving toward connection with increasing urgency. Multiple texts go out before a response comes back. You may show up unannounced or find reasons to initiate contact that, in calmer moments, you would recognize as excessive. The pursuit can feel compulsive, as if stopping would confirm abandonment. You analyze their behavior for clues, run conversations in your head, and struggle to focus on anything else until you know where you stand.`,

        why_it_makes_sense: `This response developed because, at some point, vigilance was necessary. Perhaps love was unpredictable, here one moment and gone the next. Perhaps the only way to stay connected was to monitor constantly, to never let your attention slip. The pursuit is your system's attempt to control an outcome that feels terrifyingly out of your control. It is not weakness; it is a survival strategy that no longer fits the current situation.`,

        tells: [
            'You check their online status or activity more than you would like to admit',
            'A delayed response can spiral into a full story about what it means',
            'You sometimes send follow-up messages before they have responded to the first',
            'You rehearse conversations in your head before and after they happen',
            'You feel a physical relief when they finally respond, followed by anxiety about whether the response was good enough'
        ],

        full_description: `The Anxious Pursuit modifier intensifies your pattern by adding a layer of active seeking when disconnection is sensed. This is not about wanting attention; it is about resolving unbearable uncertainty. Your nervous system interprets silence as danger and responds the only way it knows: by pursuing until safety is re-established. The problem is that the pursuit often creates the very distance it is trying to close. Partners can feel overwhelmed by the intensity, and their natural need for space triggers more pursuit, tightening the loop.`
    },

    'Avoidant Shutdown': {
        name: 'Avoidant Shutdown',
        internal_id: 'MOD_AVOIDANT_SHUTDOWN',

        how_it_shows_up: `When this modifier activates, you find yourself retreating inward, becoming logistically present but emotionally absent. You may go quiet, give short responses, or physically leave the room during difficult conversations. The shutdown often happens faster than thought; you are already behind the wall before you have decided to retreat. From the inside, this feels like self-preservation. From the outside, it can look like abandonment.`,

        why_it_makes_sense: `This response developed because, at some point, withdrawal was necessary. Perhaps emotional engagement felt overwhelming, demanding, or even dangerous. Perhaps the only way to stay intact was to retreat, to protect your inner world from invasion. The shutdown is your system's attempt to preserve something essential about yourself. It is not coldness; it is a survival strategy that no longer fits the current situation.`,

        tells: [
            'You go blank during conflict, unable to access your thoughts or feelings',
            'You sometimes need to physically leave a room that feels too emotionally charged',
            'You can seem calm while internally you are flooding',
            'After withdrawing, you often do not know how to come back',
            'You have been told you "disappear" or become unreachable during relationship stress'
        ],

        full_description: `The Avoidant Shutdown modifier intensifies your pattern by adding a layer of protective retreat when emotions get too intense. This is not about not caring; it is about preventing overwhelm. Your nervous system interprets emotional demand as threat and responds the only way it knows: by contracting inward until safety is re-established. The problem is that the shutdown often leaves your partner reaching for someone who has temporarily vanished, creating the very disconnection your system was trying to prevent.`
    },

    'Over-Functioning / Caretaker': {
        name: 'Over-Functioning / Caretaker',
        internal_id: 'MOD_CARETAKER',

        how_it_shows_up: `When this modifier activates, you find yourself taking on more than your share. You anticipate needs before they are spoken, manage logistics your partner could handle, and exhaust yourself in service of the relationship. The giving can feel automatic, as if stopping would mean you have no value. You track what you give and what you receive, even when you tell yourself it does not matter. The resentment builds in silence.`,

        why_it_makes_sense: `This response developed because, at some point, being useful was the only reliable way to be wanted. Perhaps love was conditional on performance, on proving your worth through labor. Perhaps the only time you felt secure was when you were indispensable. The caretaking is your system's attempt to earn the love it does not trust will be given freely. It is not martyrdom; it is a survival strategy that no longer fits the current situation.`,

        tells: [
            'You often anticipate what your partner needs before they do',
            'You feel guilty when you are not productive or helpful in the relationship',
            'When someone tries to take care of you, you feel uncomfortable or suspicious',
            'You carry resentment about imbalances that you have never directly addressed',
            'Your identity feels closely tied to being the one who shows up, gives, and maintains'
        ],

        full_description: `The Over-Functioning modifier intensifies your pattern by adding a layer of compulsive giving. This is not about generosity; it is about earning safety through usefulness. Your nervous system interprets being needed as the only stable ground and responds the only way it knows: by giving until depleted. The problem is that the over-functioning often prevents genuine reciprocity. Partners learn not to offer, because you have already done everything. You end up exhausted and invisible, having trained the relationship to take without giving back.`
    },

    'Control / Power Sensitivity': {
        name: 'Control / Power Sensitivity',
        internal_id: 'MOD_CONTROL',

        how_it_shows_up: `When this modifier activates, you become acutely aware of power dynamics in the relationship. You may feel monitored, questioned, or accountable in ways that trigger resistance. You might push back hard against any perceived attempt to direct your behavior, or you may create distance to preserve autonomy. The sensitivity can flip: sometimes you are the one seeking control, managing the relationship so carefully that your partner feels directed.`,

        why_it_makes_sense: `This response developed because, at some point, autonomy was under threat. Perhaps someone who loved you also controlled you, made decisions for you, or used intimacy as a tool of power. Perhaps the only way to stay yourself was to resist, to maintain boundaries so firm they became walls. The control sensitivity is your system's attempt to protect something that was once nearly lost. It is not dominance; it is a survival strategy that no longer fits the current situation.`,

        tells: [
            'You resist being told what to do, even when the request is reasonable',
            'You notice power imbalances in relationships before others do',
            'You may create distance when you feel your autonomy is threatened',
            'In conflict, you sometimes dig in harder than the issue warrants',
            'You value your independence highly, perhaps at the cost of partnership'
        ],

        full_description: `The Control/Power Sensitivity modifier intensifies your pattern by adding a layer of vigilance around autonomy. This is not about being difficult; it is about never again being at someone else's mercy. Your nervous system interprets influence as potential control and responds the only way it knows: by resisting or preemptively managing. The problem is that the sensitivity can turn reasonable partnership into power struggle. Partners feel they cannot make requests or express preferences without triggering a battle for dominance.`
    },

    'Chaos Chemistry': {
        name: 'Chaos Chemistry',
        internal_id: 'MOD_CHAOS',

        how_it_shows_up: `When this modifier activates, you find yourself drawn to intensity as confirmation of connection. Calm relationships feel wrong, suspicious, like the love has died. You may create drama unconsciously, picking fights just to feel something, pushing your partner to their edge to see if they still care. The reconciliation after conflict becomes the sweetest part, more intimate than baseline closeness ever felt.`,

        why_it_makes_sense: `This response developed because, at some point, intensity was love. Perhaps your formative relationships were volatile, teaching your nervous system that passion requires fire. Perhaps calm felt like abandonment, like no one cared enough to fight. The chaos is your system's attempt to feel connected in the only way it recognizes. It is not self-destruction; it is a survival strategy that no longer fits the current situation.`,

        tells: [
            'You feel bored or suspicious when a relationship is going smoothly',
            'Reconciliation after a fight feels more intimate than regular connection',
            'You sometimes start conflicts without quite knowing why',
            'Your most memorable relationship moments are often the dramatic ones',
            'Stable partners have felt boring to you, even when they were objectively good matches'
        ],

        full_description: `The Chaos Chemistry modifier intensifies your pattern by adding a layer of intensity-seeking. This is not about being dramatic; it is about recognizing love through the only template your nervous system trusts. Calm feels dangerous because it was dangerous once, or because it was always the prelude to something worse. The problem is that the chaos exhausts everyone, including you. The relationship becomes unsustainable, not because the love is gone, but because the pattern makes stability impossible.`
    },

    'Emotional Starvation': {
        name: 'Emotional Starvation',
        internal_id: 'MOD_STARVATION',

        how_it_shows_up: `When this modifier activates, you carry a persistent sense of not having enough, of emotional needs chronically unmet. You may hint at needs so subtly that no one notices, then feel bitter when they are not met. You may have stopped asking because asking never worked. The loneliness can persist even when you are in a relationship, because the parts of you that need are not being reached.`,

        why_it_makes_sense: `This response developed because, at some point, your needs were not met and likely were not even witnessed. Perhaps you learned early that wanting was futile, that the people who were supposed to nourish you simply could not. Perhaps you shrunk your needs so small they became invisible, even to yourself. The starvation is your system's learned hopelessness. It is not giving up; it is a survival strategy that no longer fits the current situation.`,

        tells: [
            'You often feel lonely even when you are in a relationship',
            'You dismiss or minimize your emotional needs, even to yourself',
            'When you do ask for something, you often apologize for asking',
            'You have learned not to expect much, which protects you but also guarantees deprivation',
            'When someone asks what you need, you sometimes genuinely do not know'
        ],

        full_description: `The Emotional Starvation modifier intensifies your pattern by adding a layer of chronic unmet needs. This is not about being needy; it is about having learned that needs are futile. Your system stopped expecting nourishment because expecting was too painful. The problem is that the shutdown prevents you from receiving even when it is offered. Partners may try to give, but you cannot take in. The starvation continues not because love is absent, but because your system no longer knows how to let it in.`
    }
};

export default MODULE_TEMPLATES;
