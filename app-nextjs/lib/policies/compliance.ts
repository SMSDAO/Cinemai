export interface ComplianceResult {
  compliant: boolean;
  reason?: string;
  suggestions?: string[];
}

/**
 * Check if a prompt or request complies with likeness and consent policies
 * 
 * This function checks for:
 * - Direct impersonation requests of real people
 * - Use of real person names without context
 * - Requests that could mislead users
 * 
 * @param prompt - The user's prompt or input to check
 * @returns ComplianceResult indicating if the prompt is compliant
 */
export function checkLikenessCompliance(prompt: string): ComplianceResult {
  const lowerPrompt = prompt.toLowerCase();
  
  // Patterns that indicate impersonation attempts
  const impersonationPatterns = [
    /make .+ say/i,
    /pretend to be/i,
    /impersonate/i,
    /as if you are/i,
    /voice of .+ (person|celebrity|figure)/i,
    /look like .+ (person|celebrity|figure)/i,
    /sound like .+ (person|celebrity|figure)/i,
  ];

  // Check for impersonation patterns
  for (const pattern of impersonationPatterns) {
    if (pattern.test(prompt)) {
      return {
        compliant: false,
        reason: "You must have explicit rights to use real-person likenesses.",
        suggestions: [
          "Use a fictional avatar instead",
          "Create an original character",
          "Use clearly stylized representations that don't claim to be the real person"
        ]
      };
    }
  }

  // List of common celebrity/public figure indicators
  // In production, this would be a more comprehensive list or API call
  const publicFigureIndicators = [
    'celebrity', 'famous person', 'public figure', 
    'politician', 'actor', 'actress', 'singer',
    'president', 'ceo of', 'founder of'
  ];

  const containsPublicFigureReference = publicFigureIndicators.some(
    indicator => lowerPrompt.includes(indicator)
  );

  if (containsPublicFigureReference && 
      (lowerPrompt.includes('voice') || 
       lowerPrompt.includes('face') || 
       lowerPrompt.includes('likeness') ||
       lowerPrompt.includes('appearance'))) {
    return {
      compliant: false,
      reason: "Using the likeness of public figures requires explicit, documented consent.",
      suggestions: [
        "Use a fictional character or avatar",
        "If you have rights, please provide documentation",
        "Consider using voice actors or generic avatars"
      ]
    };
  }

  // Prompt is compliant
  return {
    compliant: true
  };
}

/**
 * Log a compliance check to the audit log
 */
export async function logComplianceCheck(
  userId: string | null,
  prompt: string,
  result: ComplianceResult
) {
  const { prisma } = await import('../prisma');
  
  await prisma.auditLog.create({
    data: {
      userId,
      action: result.compliant ? 'compliance_check_passed' : 'compliance_check_failed',
      payload: {
        prompt: prompt.substring(0, 500), // Truncate for storage
        result: result as any,
        timestamp: new Date().toISOString()
      } as any
    }
  });
}
