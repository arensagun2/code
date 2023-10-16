import java.util.ArrayList;

import jminusminus.CLEmitter;

import static jminusminus.CLConstants.*;

/**
 * This class programmatically generates the class file for the following Java application:
 * 
 * <pre>
 * public class IsPrime {
 *     // Entry point.
 *     public static void main(String[] args) {
 *         int n = Integer.parseInt(args[0]);
 *         boolean result = isPrime(n);
 *         if (result) {
 *             System.out.println(n + " is a prime number");
 *         } else {
 *             System.out.println(n + " is not a prime number");
 *         }
 *     }
 *
 *     // Returns true if n is prime, and false otherwise.
 *     private static boolean isPrime(int n) {
 *         if (n < 2) {
 *             return false;
 *         }
 *         for (int i = 2; i <= n / i; i++) {
 *             if (n % i == 0) {
 *                 return false;
 *             }
 *         }
 *         return true;
 *     }
 * }
 * </pre>
 */
public class GenIsPrime {
    public static void main(String[] args) {
        // entry point
        // createa new clemitter instance
        CLEmitter e = new CLEmitter(true);

        // Create an ArrayList instance to store modifers
        ArrayList<String> modifiers = new ArrayList<String>();

        // public class IsPrime {
        modifiers.add("public");
        e.addClass(modifiers, "IsPrime", "java/lang/Object", null, true);

        // public static void main(String[] args) {
        modifiers.clear();
        modifiers.add("public");
        modifiers.add("static");
        modifiers.add("void");
        e.addMethod(modifiers, "main", "([Ljava/lang/String;)V", null, true);
        
        // int n = Integer.parstInt(args[0]);
        e.addNoArgInstruction(ALOAD_0);
        e.addNoArgInstruction(ICONST_0);
        e.addNoArgInstruction(AALOAD);
        e.addMemberAccessInstruction(INVOKESTATIC, "java/lang/Integer", "parseInt", "(Ljava/lang/String;)I");
        e.addNoArgInstruction(ISTORE_1);

        // boolean result = isPrime();
        e.addNoArgInstruction(ILOAD_1);
        e.addMemberAccessInstruction(INVOKESTATIC, "IsPrime", "PRIME", "(I)Z");
        e.addNoArgInstruction(ISTORE_2);

        // if (result) {
        e.addNoArgInstruction(ILOAD_2);
        e.addBranchInstruction(IFEQ, "nPRIME");

        // Get System.out on stack
        e.addMemberAccessInstruction(GETSTATIC, "java/lang/System", "out", "Ljava/io/PrintStream;");

        // Create a new instance of StringBuffer on stack for string concatenations
        e.addReferenceInstruction(NEW, "java/lang/StringBuffer");
        e.addNoArgInstruction(DUP);
        e.addMemberAccessInstruction(INVOKESPECIAL, "java/lang/StringBuffer", "<init>", "()V");

        // sb.append(n);
        e.addNoArgInstruction(ILOAD_1);
        e.addMemberAccessInstruction(INVOKEVIRTUAL, "java/lang/StringBuffer", "append", "(I)Ljava/lang/StringBuffer;");
        e.addLDCInstruction(" is a prime number");
        e.addMemberAccessInstruction(INVOKEVIRTUAL, "java/lang/StringBuffer", "append", "(Ljava/lang/String;)Ljava/lang/StringBuffer;");

        // System.out.println(sb.toString());
        e.addMemberAccessInstruction(INVOKEVIRTUAL, "java/lang/StringBuffer", "toString", "()Ljava/lang/String;");
        e.addMemberAccessInstruction(INVOKEVIRTUAL, "java/io/PrintStream", "println", "(Ljava/lang/String;)V");
        e.addBranchInstruction(GOTO, "ENDIF");
        e.addLabel("nPRIME");

        // get System.out on stack
        e.addMemberAccessInstruction(GETSTATIC, "java/lang/System", "out", "Ljava/io/PrintStream;");

        // Create another new instance of StringBuffer on stack for string concatenations
        e.addReferenceInstruction(NEW, "java/lang/StringBuffer");
        e.addNoArgInstruction(DUP);
        e.addMemberAccessInstruction(INVOKESPECIAL, "java/lang/StringBuffer", "<init>", "()V");

        // sb.append(n);
        e.addNoArgInstruction(ILOAD_1);
        e.addMemberAccessInstruction(INVOKEVIRTUAL, "java/lang/StringBuffer", "append", "(I)Ljava/lang/StringBuffer;");

        // sb.append(" is not a prime number");
        e.addLDCInstruction(" is not a prime number");
        e.addMemberAccessInstruction(INVOKEVIRTUAL, "java/lang/StringBuffer", "append", "(Ljava/lang/String;)Ljava/lang/StringBuffer;");

        // System.out.println(sb.toString());
        e.addMemberAccessInstruction(INVOKEVIRTUAL, "java/lang/StringBuffer", "toString", "()Ljava/lang/String;");
        e.addMemberAccessInstruction(INVOKEVIRTUAL, "java/io/PrintStream", "println", "(Ljava/lang/String;)V");
        e.addLabel("ENDIF");

        // return;
        e.addNoArgInstruction(RETURN);

        // private static boolean isPrime(int n) {
        modifiers.clear();
        modifiers.add("private");
        modifiers.add("static");
        e.addMethod(modifiers, "PRIME", "(I)Z", null, true);

        // if (n < 2) {
        e.addNoArgInstruction(ILOAD_0);
        e.addNoArgInstruction(ICONST_2);
        e.addBranchInstruction(IF_ICMPGE, "A");

        // return false;
        e.addNoArgInstruction(ICONST_0);
        e.addNoArgInstruction(IRETURN); 

        // Start of for loop
        // i = 2
        e.addLabel("A");
        e.addNoArgInstruction(ICONST_2);
        e.addNoArgInstruction(ISTORE_1);

        // if i >= n / i -> C
        e.addLabel("D");
        e.addNoArgInstruction(ILOAD_1);
        e.addNoArgInstruction(ILOAD_0);
        e.addNoArgInstruction(ILOAD_1);
        // divide n / i
        e.addNoArgInstruction(IDIV);
        e.addBranchInstruction(IF_ICMPGT, "B");

        // if n % i != 0 -> increment
        e.addNoArgInstruction(ILOAD_0);
        e.addNoArgInstruction(ILOAD_1);
        e.addNoArgInstruction(IREM); // get n % i
        e.addNoArgInstruction(ICONST_0);
        e.addBranchInstruction(IF_ICMPNE, "C");

        // return false
        e.addNoArgInstruction(ICONST_0);
        e.addNoArgInstruction(IRETURN); // contstant is 0, return

        // increment i by 1
        e.addLabel("C");
        e.addNoArgInstruction(ILOAD_1);
        e.addNoArgInstruction(ICONST_1);
        e.addNoArgInstruction(IADD);
        e.addNoArgInstruction(ISTORE_1);
        // loop back
        e.addBranchInstruction(GOTO, "D");

        // return True
        e.addLabel("B");
        e.addNoArgInstruction(ICONST_1);
        e.addNoArgInstruction(IRETURN); // contstant is 1, return

        // Write IsPrime.class to file system
        e.write();
    }
}
